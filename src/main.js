import {genTaskList} from './mock/task.js';
import {genFilterList} from './mock/filter.js';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Sorter from './components/board.js';
import Card from './components/card.js';
import LoadMoreButton from './components/button.js';

const CARD_SHOWING = 8;
const TASK_COUNT = 22;
const taskList = genTaskList(TASK_COUNT);
const filterList = genFilterList(taskList);
let showedTaskCount = 0;


const render = function (element, container) {
  container.append(element);
};

const renderCard = function (element, container) {
  render(element, container);
  showedTaskCount += 1;
};


const menuContainer = document.querySelector(`.main__control`);
const menu = new Menu();
const menuElement = menu.getElement();
render(menuElement, menuContainer);

const main = document.querySelector(`.main`);
const filter = new Filter(filterList);
const filterElement = filter.getElement();
render(filterElement, main);

const sorter = new Sorter();
const sorterElement = sorter.getElement();
render(sorterElement, main);

const boardTasks = document.querySelector(`.board__tasks`);

const cardObjects = [];
Array(...Array(taskList.length)).forEach((el, i) => {
  const card = new Card(taskList[i]);
  cardObjects.push(card);
});


const editCardElement = cardObjects[showedTaskCount].getElement(`editCard`);
renderCard(editCardElement, boardTasks);


while (showedTaskCount < CARD_SHOWING) {
  const cardElement = cardObjects[showedTaskCount].getElement(`card`);
  renderCard(cardElement, boardTasks);
}

const boardContainer = document.querySelector(`.board`);
const loadMoreButtonObj = new LoadMoreButton();
const loadMoreButtonElement = loadMoreButtonObj.getElement();
render(loadMoreButtonElement, boardContainer);

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, function () {
  let counter = 0;
  while (showedTaskCount < taskList.length && counter < CARD_SHOWING) {
    const cardElement = cardObjects[showedTaskCount].getElement(`card`);
    renderCard(cardElement, boardTasks);
    counter += 1;
  }
  if (showedTaskCount === taskList.length) {
    loadMoreButton.remove();
  }
});
