import {createElement} from '../utils.js';

const createSorterTemplate = function () {
  return (
    `<section class="board container">
    <div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>
    <div class="board__tasks"></div>
  </section>`
  );
}


class Sorter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSorterTemplate();
  }

  getElement() {
    if (!this._element) {
      const template = this.getTemplate();
      this._element = createElement(template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Sorter;
