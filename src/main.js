import {taskList} from './mock/task.js';
import {filterList} from './mock/filter.js';
import {createMenu} from './components/menu.js';
import {createMainFilter} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createCard, createEditCard} from './components/card.js';
import {createLoadMoreButton} from './components/button.js';

const CARD_COUNT = 3;

const render = function (element, container) {
  container.insertAdjacentHTML(`beforeend`, element);
};

const menuContainer = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);

render(createMenu(), menuContainer);
render(createMainFilter(filterList), main);
render(createBoardTemplate(), main);

const boardTasks = document.querySelector(`.board__tasks`);
render(createEditCard(taskList[0]), boardTasks);

Array.apply(null, {length: CARD_COUNT}).forEach((element, i) => {
  render(createCard(taskList.slice(1,taskList.length)[i]), boardTasks);
});

const boardContainer = document.querySelector(`.board`);
render(createLoadMoreButton(), boardContainer);
