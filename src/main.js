import {genTaskList} from './mock/task.js';
import {genFilterList} from './mock/filter.js';
import {createMenu} from './components/menu.js';
import {createMainFilter} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createCard, createEditCard} from './components/card.js';
import {createLoadMoreButton} from './components/button.js';

const CARD_SHOWING = 8
const TASK_COUNT = 22;
const taskList = genTaskList(TASK_COUNT);
const filterList = genFilterList(taskList);
let showedTaskCount = 0;


const render = function (element, container) {
  container.insertAdjacentHTML(`beforeend`, element);
};

const renderCard = function (element, container) {
  render(element, container);
  showedTaskCount += 1;
}

const menuContainer = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);

render(createMenu(), menuContainer);
render(createMainFilter(filterList), main);
render(createBoardTemplate(), main);

const boardTasks = document.querySelector(`.board__tasks`);
renderCard(createEditCard(taskList[showedTaskCount]), boardTasks);
while (showedTaskCount < CARD_SHOWING) {
  renderCard(createCard(taskList[showedTaskCount]), boardTasks);
}

const boardContainer = document.querySelector(`.board`);
render(createLoadMoreButton(), boardContainer);

const loadMoreButton = document.querySelector(`.load-more`)

loadMoreButton.addEventListener(`click`, function () {
  let counter = 0;
  while (showedTaskCount < taskList.length && counter < CARD_SHOWING) {
    renderCard(createCard(taskList[showedTaskCount]), boardTasks);
    counter += 1;
  }
  if (showedTaskCount === taskList.length) {
    loadMoreButton.remove();
  }
})
