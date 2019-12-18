import AbstractComponent from './abstractComponent.js';

const createBoardTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


class BoardTasks extends AbstractComponent {
  getTemplate() {
    return createBoardTasksTemplate();
  }
}


export default BoardTasks;
