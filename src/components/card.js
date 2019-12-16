import AbstractComponent from './abstractComponent.js';
import {isExpired, isRepeating, createDate, createTime} from '../utils.js';

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

const createButtons = function (name, isActive) {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
    >
      ${name}
    </button>`
  );
};


const createCardTemplate = function (task) {
  const {description, tags, color, repeatingDays, dueDate, isArchive, isFavorite} = task;
  const createArchiveButton = createButtons(`archive`, isArchive);
  const createFavoriteButton = createButtons(`favorites`, isFavorite);
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
              ${createArchiveButton}
              ${createFavoriteButton}
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


class Card extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  setEditHandler(handler) {
    const editButton = this.getElement().querySelector(`.card__btn--edit`);
    editButton.addEventListener(`click`, handler);
  }

  setFavoritesHandler(handler) {
    const favoritesButton = this.getElement().querySelector(`.card__btn--favorites`);
    favoritesButton.addEventListener(`click`, handler);
  }

  setArchiveHandler(handler) {
    const archiveButton = this.getElement().querySelector(`.card__btn--archive`);
    archiveButton.addEventListener(`click`, handler);
  }

  getTemplate() {
    return createCardTemplate(this._task);
  }

  removeElement() {
    this._element = null;
  }
}


export default Card;
