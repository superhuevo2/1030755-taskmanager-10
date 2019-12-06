import {createElement} from '../utils.js';


const createMenuTemplate = function () {
  return (
    `<section class="control__btn-wrap">
      <input
        type="radio"
        name="control"
        id="control__new-task"
        class="control__input visually-hidden"
      />
      <label for="control__new-task" class="control__label control__label--new-task"
        >+ ADD NEW TASK</label
      >
      <input
        type="radio"
        name="control"
        id="control__task"
        class="control__input visually-hidden"
        checked
      />
      <label for="control__task" class="control__label">TASKS</label>
      <input
        type="radio"
        name="control"
        id="control__statistic"
        class="control__input visually-hidden"
      />
      <label for="control__statistic" class="control__label"
        >STATISTICS</label
      >
    </section>`
  );
}


class Menu {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createMenuTemplate();
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


export default Menu;
