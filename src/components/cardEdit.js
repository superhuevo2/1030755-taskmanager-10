import AbstractComponent from './abstractComponent.js';
import {COLORS} from '../const.js';
import {isRepeating, createDate, createTime} from '../utils.js';

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

const setRepeat = function (repeatingDays) {
  const repeatDict = {
    repeatClass: null,
    repeatAttr: null,
    repeatStatus: null,
    repeatDays: {}
  };
  if (isRepeating(repeatingDays)) {
    repeatDict.repeatClass = `card--repeat`;
    repeatDict.repeatAttr = ``;
    repeatDict.repeatStatus = `yes`;
    for (let day in repeatingDays) {
      if (repeatingDays.hasOwnProperty(day)) {
        repeatDict.repeatDays[day] = repeatingDays[day] ? `checked` : ``;
      }
    }
  } else {
    repeatDict.repeatClass = ``;
    repeatDict.repeatAttr = `disabled`;
    repeatDict.repeatStatus = `no`;
    for (let day in repeatingDays) {
      if (repeatingDays.hasOwnProperty(day)) {
        repeatDict.repeatDays[day] = ``;
      }
    }
  }
  return repeatDict;
};

const setDeadline = function (dateObject) {
  let deadlineStatus;
  let deadlineAttr;
  let value;
  if (dateObject) {
    const date = createDate(dateObject);
    const time = createTime(dateObject);
    value = `value="${date} ${time}"`;
    deadlineStatus = `yes`;
    deadlineAttr = ``;
  } else {
    value = ``;
    deadlineStatus = `no`;
    deadlineAttr = `disabled`;
  }
  return [deadlineStatus, deadlineAttr, value];
};

const setColor = function (color) {
  const colorClass = `card--${color}`;
  const colorStatus = {};
  COLORS.forEach(function (el) {
    if (el === color) {
      colorStatus[el] = `checked`;
    } else {
      colorStatus[el] = ``;
    }
  });
  return [colorClass, colorStatus];
};

const createCardEditTemplate = function (task) {
  const {description, tags, dueDate, color, repeatingDays} = task;
  const repeatDict = setRepeat(repeatingDays);
  const [deadlineStatus, deadlineAttr, deadlineValue] = setDeadline(dueDate);
  const [colorClass, colorStatus] = setColor(color);
  const hashtag = createHashtag(tags);

  let repeatFragment = ``;
  Object.keys(repeatDict.repeatDays).forEach((element) => {
    const repeatTemplate = (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${element}-1"
        name="repeat"
        value="${element}"
        ${repeatDict.repeatDays[element]}
      />
      <label class="card__repeat-day" for="repeat-${element}-1"
        >${element}</label
      >`
    );
    repeatFragment += repeatTemplate;
  });

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

  return (
    `<article class="card card--edit ${colorClass} ${repeatDict.repeatClass}">
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
                  repeat:<span class="card__repeat-status">${repeatDict.repeatStatus}</span>
                </button>

                <fieldset class="card__repeat-days" ${repeatDict.repeatAttr}>
                  <div class="card__repeat-days-inner">
                    ${repeatFragment}
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
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

class CardEdit extends AbstractComponent {

  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createCardEditTemplate(this._task);
  }
}

export default CardEdit;
