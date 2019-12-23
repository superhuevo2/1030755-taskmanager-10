import AbstractComponent from './abstractComponent.js';

const createBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};


class Board extends AbstractComponent {

  getTemplate() {
    return createBoardTemplate();
  }

}

export default Board;
