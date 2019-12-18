import AbstractComponent from './abstractComponent.js';

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMoreButton extends AbstractComponent {

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
}

export default LoadMoreButton;
