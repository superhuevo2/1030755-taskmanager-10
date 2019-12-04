import {COLORS, MONTH} from '../const.js';

function isExpired(date) {
  return date instanceof Date && date < Date.now();
}

function isRepeating(days) {
  return Object.values(days).some(Boolean);
}

function createHashtag(tagSet) {
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
}

function createDate(date) {
  return `${date.getDate()} ${MONTH[date.getMonth()]}`;
}

function castTimeFormat(value) {
  return value < 10 ? `0${value}` : String(value);
}

function createTime(date) {
  let hours = castTimeFormat(date.getHours());
  let minutes = castTimeFormat(date.getMinutes());
  let interval = date.getHours() > 11 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
}

const createCard = function (task) {
  const {description, tags, dueDate, color, repeatingDays} = task;

  const isDateShowing = Boolean(dueDate);
  const date = isDateShowing ? createDate(dueDate) : ``;
  const time = isDateShowing ? createTime(dueDate) : ``;
  const hashtag = createHashtag(tags);
  const repeatClass = isRepeating(repeatingDays) ? `card--repeat` : ``;
  const deadlineClass = isExpired(dueDate) ? `card--deadline` : ``;


  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites card__btn--disabled"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}.</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${hashtag}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

function setRepeat(repeatingDays) {
  let repeatClass;
  let repeatAttr;
  let repeatStatus;
  let repeatDays;
  if (isRepeating(repeatingDays)) {
    repeatClass = `card--repeat`;
    repeatAttr = ``;
    repeatStatus = `yes`;
    repeatDays = {};
    for (let day in repeatingDays) {
      if (repeatingDays.hasOwnProperty(day)) {
        repeatDays[day] = repeatingDays[day] ? `checked` : ``;
      }
    }
  } else {
    repeatClass = ``;
    repeatAttr = `disabled`;
    repeatStatus = `no`;
    repeatDays = {};
    for (let day in repeatingDays) {
      if (repeatingDays.hasOwnProperty(day)) {
        repeatDays[day] = ``;
      }
    }
  }
  return [repeatClass, repeatAttr, repeatStatus, repeatDays];
}

function setDeadline(dateObject) {
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
}

function setColor(color) {
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
}

const createEditCard = function (task) {
  const {description, tags, dueDate, color, repeatingDays} = task;
  const [repeatClass, repeatAttr, repeatStatus, repeatDays] = setRepeat(repeatingDays);
  const [deadlineStatus, deadlineAttr, deadlineValue] = setDeadline(dueDate);
  const [colorClass, colorStatus] = setColor(color);
  const hashtag = createHashtag(tags);


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
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-1"
                      name="repeat"
                      value="mo"
                      ${repeatDays[`mo`]}
                    />
                    <label class="card__repeat-day" for="repeat-mo-1"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-1"
                      name="repeat"
                      value="tu"
                      ${repeatDays[`tu`]}
                    />
                    <label class="card__repeat-day" for="repeat-tu-1"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-1"
                      name="repeat"
                      value="we"
                      ${repeatDays[`we`]}
                    />
                    <label class="card__repeat-day" for="repeat-we-1"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-1"
                      name="repeat"
                      value="th"
                      ${repeatDays[`th`]}
                    />
                    <label class="card__repeat-day" for="repeat-th-1"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-1"
                      name="repeat"
                      value="fr"
                      ${repeatDays[`fr`]}
                    />
                    <label class="card__repeat-day" for="repeat-fr-1"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-1"
                      ${repeatDays[`sa`]}
                    />
                    <label class="card__repeat-day" for="repeat-sa-1"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-1"
                      name="repeat"
                      value="su"
                      ${repeatDays[`su`]}
                    />
                    <label class="card__repeat-day" for="repeat-su-1"
                      >su</label
                    >
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
                <input
                  type="radio"
                  id="color-black-1"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                  ${colorStatus[`black`]}
                />
                <label
                  for="color-black-1"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-1"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                  ${colorStatus[`yellow`]}
                />
                <label
                  for="color-yellow-1"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-1"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                  ${colorStatus[`blue`]}
                />
                <label
                  for="color-blue-1"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-1"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                  ${colorStatus[`green`]}
                />
                <label
                  for="color-green-1"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-1"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  ${colorStatus[`pink`]}
                />
                <label
                  for="color-pink-1"
                  class="card__color card__color--pink"
                  >pink</label
                >
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

export {createCard, createEditCard};
