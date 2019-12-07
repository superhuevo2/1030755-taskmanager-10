import {createElement} from "../utils.js";

const createLoadMoreButtonTemplate = function () {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  getElement() {
    if (!this._element) {
      const template = this.getTemplate();
      this._element = createElement(template);
    }
    return this._element;
  }
}

export default LoadMoreButton;
