import AbstractComponent from './abstractComponent.js';

const createLoadMoreButtonTemplate = function () {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMoreButton  extends AbstractComponent {

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
}

export default LoadMoreButton;
