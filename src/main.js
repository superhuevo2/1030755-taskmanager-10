import {genTaskList} from './mock/task.js';
import {genFilterList} from './mock/filter.js';
import {render} from './render.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Board from './components/board.js';
import BoardController from './boardController.js';


const TASK_COUNT = 25;
const taskList = genTaskList(TASK_COUNT);
const filterList = genFilterList(taskList);


const menuContainer = document.querySelector(`.main__control`);
const menu = new Menu();
render(menu, menuContainer);


const main = document.querySelector(`.main`);
const filter = new Filter(filterList);
render(filter, main);


const board = new Board();
render(board, main);

const boardController = new BoardController(board);
boardController.render(taskList);

