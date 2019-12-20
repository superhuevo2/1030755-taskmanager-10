import flatpickr from 'flatpickr';
import AbstractSmartComponent from './abstractSmartComponent.js';
import {COLORS} from '../const.js';
<<<<<<< HEAD
import {createDate, createTime, createHashtag} from '../utils/utils.js';

=======
import {createDate, createTime, createHashtag} from '../utils.js';
require(`flatpickr/dist/flatpickr.min.css`);
>>>>>>> подключил flatpickr

const setColor = (color) => {
  const colorClass = `card--${color}`;
  const colorStatus = {};
  COLORS.forEach((el) => {
    colorStatus[el] = (el === color) ? `checked` : ``;
  });
  return [colorClass, colorStatus];
};

const createSaveButton = (isRepeating, repeatingDays) => {
  const disabledAttr = isRepeating && !Object.values(repeatingDays).some(Boolean) ? `disabled` : ``;
  return (
    `<button class="card__save" type="submit" ${disabledAttr}>save</button>`
  );
};

const createRepeatingMarkup = (isRepeating, repeatingDays) => {
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

const createColorMarkup = (colorStatus) => {
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

const createCardEditTemplate = (task, isDateShowing, isRepeating, repeatingDays) => {
  let {description, tags, dueDate, color} = task;


  const deadlineStatus = isDateShowing ? `yes` : `no`;
  const deadlineAttr = isDateShowing ? `` : `disabled`;
  const deadlineValue = isDateShowing && dueDate ? `value="${createDate(dueDate)} ${createTime(dueDate)}"` : ``;


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

    this._flatpickr = null;
    this._applyFlatpickr();

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
    editCardForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      handler();
    });
  }

  getTemplate() {
    return createCardEditTemplate(this._task, this._isDateShowing, this._isRepeating, this._repeatingDays);
  }


  getChangedInfo() {
    return {
      repeatingDays: this._repeatingDays,
      dueDate: this._date
    };
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const task = this._task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeating = Object.values(task.repeatingDays).some(Boolean);
    this._repeatingDays = Object.assign({}, task.repeatingDays);

    this.rerender();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const dateElement = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(dateElement, {
        altInput: true,
        allowInput: true,
        defaultDate: this._date,
      });
    }
  }

  _subscribeOnEvents() {
    const dateButton = this.getElement().querySelector(`.card__date-deadline-toggle`);
    dateButton.addEventListener(`click`, (evt) => {
      this._isDateShowing = !this._isDateShowing;

      if (this._isDateShowing) {
        this._date = new Date(evt.target.value);
      } else {
        this._date = null;
      }

      this.rerender();
    });
    this.setSubmitHandler(this._submitHandler);

    const cardRepeatButton = this.getElement().querySelector(`.card__repeat-toggle`);
    cardRepeatButton.addEventListener(`click`, () => {
      this._isRepeating = !this._isRepeating;

      if (!this._isRepeating) {
        Object.keys(this._repeatingDays).forEach((day) => {
          this._repeatingDays[day] = false;
        });

      }

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
