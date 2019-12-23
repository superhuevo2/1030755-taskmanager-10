import AbstractComponent from './abstractComponent.js';

const SortType = {
  DEFAULT: `default`,
  DATE_UP: `dateUp`,
  DATE_DOWN: `dateDown`
};

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter" data-sort="${SortType.DEFAULT}" >SORT BY DEFAULT</a>
      <a href="#" class="board__filter" data-sort="${SortType.DATE_UP}" >SORT BY DATE up</a>
      <a href="#" class="board__filter" data-sort="${SortType.DATE_DOWN}" >SORT BY DATE down</a>
    </div>`
  );
};


class Sort extends AbstractComponent {
  constructor() {
    super();
    this._sortType = SortType.DEFAULT;
  }

  setSortClickHandler(handler) {
    this._element.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const selectedSortType = evt.target.getAttribute(`data-sort`);
      if (selectedSortType === this._sortType) {
        return;
      }
      this._sortType = selectedSortType;
      handler(this._sortType);
    });
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._sortType;
  }
  setSortType(type) {
    this._sortType = type;
  }
}

export default Sort;
