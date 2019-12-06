import {createElement, isActiveTask} from '../utils.js';

const createBorderTemplate = function () {
  return (
    `<section class="board container">
      <div class="board__tasks"></div>
    </section>`
  );
};

const createNoTasksTemplate = function () {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};


class Board {
  constructor() {
    this._element = null;
  }

  getBorderTemplate() {
    return createBorderTemplate();
  }

  getNoTasksTemplate() {
    return createNoTasksTemplate();
  }

  getTasksContainerTemplate() {
    return createBorderTemplate();
  }

  getElement(taskList) {
    if (!this._element) {
      let template;
      if (isActiveTask(taskList)) {
        template = this.getTasksContainerTemplate();
      } else {
        template = this.getNoTasksTemplate();
      }
      this._element = createElement(template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default Board;
