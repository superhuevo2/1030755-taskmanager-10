import {genTaskList} from './mock/task.js';
import {render} from './utils/render.js';
import Menu from './components/menu.js';
import Board from './components/board.js';
import BoardController from './controller/boardController.js';
import TasksModel from './models/tasks.js';
import FilterController from './controller/filterController.js';


const TASK_COUNT = 25;
const taskList = genTaskList(TASK_COUNT);

const tasksModel = new TasksModel();
tasksModel.setTasks(taskList);


const menuContainer = document.querySelector(`.main__control`);
const menu = new Menu();
render(menu, menuContainer);


const main = document.querySelector(`.main`);
const filterController = new FilterController(tasksModel, main);
filterController.render();


const board = new Board();
render(board, main);

const boardController = new BoardController(tasksModel, board);
boardController.render();

menu.getElement().addEventListener(`change`, (evt) => {
  evt.preventDefault();

  if (evt.target.id === `control__new-task`) {
    boardController.addNewTask();

    menu.getElement().querySelector(`#control__task`).checked = true;
  }
});
