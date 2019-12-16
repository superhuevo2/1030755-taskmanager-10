import AbstractSmartComponent from './abstractSmartComponent.js';
import {COLORS} from '../const.js';
import {createDate, createTime} from '../utils.js';

const createHashtag = function (tagSet) {
  let fragment = ``;
  tagSet.forEach((element) => {
    const template = (
      `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${element}
        </span>
      </span>
      `
    );
    fragment += template;
  });
  return fragment;
};


const setColor = function (color) {
  const colorClass = `card--${color}`;
  const colorStatus = {};
  COLORS.forEach(function (el) {
    colorStatus[el] = (el === color) ? `checked` : ``;
  });
  return [colorClass, colorStatus];
};

const createSaveButton = function (isRepeating, repeatingDays) {
  const disabledAttr = isRepeating && !Object.values(repeatingDays).some(Boolean) ? `disabled` : ``;
  return (
    `<button class="card__save" type="submit" ${disabledAttr}>save</button>`
  );
};

const createRepeatingMarkup = function (isRepeating, repeatingDays) {
  let repeatingMarkup = ``;

  if (isRepeating) {
    for (let day in repeatingDays) {
      if (repeatingDays.hasOwnProperty(day)) {
        const repeatTemplate = (
          `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}-1"
            name="repeat"
            value="${day}"
            ${repeatingDays[day] ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}-1"
            >${day}</label
          >`
        );
        repeatingMarkup += repeatTemplate;
      }
    }
  }
  return repeatingMarkup;
};

const createColorMarkup = function (colorStatus) {
  let colorsFragment = ``;

  Object.keys(colorStatus).forEach((element) => {
    const colorTemplate = (
      `<input
        type="radio"
        id="color-${element}-1"
        class="card__color-input card__color-input--${element} visually-hidden"
        name="color"
        value="${element}"
        ${colorStatus[element]}
      />
      <label
        for="color-${element}-1"
        class="card__color card__color--${element}"
        >${element}</label
      >`
    );
    colorsFragment += colorTemplate;
  });

  return colorsFragment;
};

const createCardEditTemplate = function (task, isDateShowing, isRepeating, repeatingDays) {
  let {description, tags, dueDate, color} = task;

  if (!dueDate) {
    dueDate = new Date();
  }
  const deadlineStatus = isDateShowing ? `yes` : `no`;
  const deadlineAttr = isDateShowing ? `` : `disabled`;
  const deadlineValue = isDateShowing ? `value="${createDate(dueDate)} ${createTime(dueDate)}"` : ``;


  const repeatClass = isRepeating ? `card--repeat` : ``;
  const repeatAttr = isRepeating ? `` : `disabled`;
  const repeatStatus = isRepeating ? `yes` : `no`;
  const repeatingFragment = createRepeatingMarkup(isRepeating, repeatingDays);

  const hashtag = createHashtag(tags);

  const [colorClass, colorStatus] = setColor(color);
  let colorsFragment = createColorMarkup(colorStatus);

  const saveButton = createSaveButton(isRepeating, repeatingDays);

  return (
    `<article class="card card--edit ${colorClass} ${repeatClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${deadlineStatus}</span>
                </button>

                <fieldset class="card__date-deadline" ${deadlineAttr}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      ${deadlineValue}
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${repeatStatus}</span>
                </button>

                <fieldset class="card__repeat-days" ${repeatAttr}>
                  <div class="card__repeat-days-inner">
                    ${repeatingFragment}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtag}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsFragment}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            ${saveButton}
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

class CardEdit extends AbstractSmartComponent {

  constructor(task) {
    super();
    this._task = task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeating = Object.values(task.repeatingDays).some(Boolean);
    this._repeatingDays = Object.assign({}, task.repeatingDays);
    this._date = task.dueDate;

    this._submitHandler = null;
    this._subscribeOnEvents();
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  setSubmitHandler(handler) {
    if (!this._submitHandler) {
      this._submitHandler = handler;
    }
    const editCardForm = this.getElement().querySelector(`form`);
    editCardForm.addEventListener(`submit`, handler);
  }

  getTemplate() {
    return createCardEditTemplate(this._task, this._isDateShowing, this._isRepeating, this._repeatingDays);
  }

  reset() {
    const task = this._task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeating = Object.values(task.repeatingDays).some(Boolean);
    this._repeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  _subscribeOnEvents() {
    const dateButton = this.getElement().querySelector(`.card__date-deadline-toggle`);
    dateButton.addEventListener(`click`, () => {
      this._isDateShowing = !this._isDateShowing;

      this.rerender();
    });
    this.setSubmitHandler(this._submitHandler);

    const cardRepeatButton = this.getElement().querySelector(`.card__repeat-toggle`);
    cardRepeatButton.addEventListener(`click`, () => {
      this._isRepeating = !this._isRepeating;

      this.rerender();
    });

    const cardRepeatDays = this.getElement().querySelectorAll(`.card__repeat-day-input`);
    cardRepeatDays.forEach((day) => {
      day.addEventListener(`click`, (evt) => {
        this._repeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    });
  }
}

export default CardEdit;
