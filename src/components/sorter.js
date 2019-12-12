import AbstractComponent from './abstractComponent.js';

const createSorterTemplate = function () {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};


class Sorter extends AbstractComponent {

  getTemplate() {
    return createSorterTemplate();
  }
}

export default Sorter;
