import AbstractComponent from './abstractComponent.js';

const createNoTasksTemplate = function () {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};

class NoTask extends AbstractComponent {
  getTemplate() {
    return createNoTasksTemplate();
  }
}

export default NoTask;
