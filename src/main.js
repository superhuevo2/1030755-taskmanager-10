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

const switchCard = function (newElement, oldElement) {
  const parentElement = oldElement.parentNode;
  parentElement.replaceChild(newElement, oldElement);
}

const renderCard = function () {
  const boardTasks = document.querySelector(`.board__tasks`);

  const cardElement = cardObjects[showedTaskCount].getElement(`card`);
  cardObjects[showedTaskCount].removeElement();
  const cardEditElement = cardObjects[showedTaskCount].getElement(`editCard`);

  const editButton = cardElement.querySelector(`.card__btn--edit`);
  editButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    switchCard(cardEditElement, cardElement);
  })

  render(cardElement, boardTasks);
  showedTaskCount += 1;

  const editCardForm = cardEditElement.querySelector(`form`);
  editCardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    switchCard(cardElement, cardEditElement);
  })
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


const cardObjects = [];
taskList.forEach((el) => {
  const card = new Card(el);
  cardObjects.push(card);
});


while (showedTaskCount < CARD_SHOWING) {
  renderCard();
}

const boardContainer = document.querySelector(`.board`);
const loadMoreButtonObj = new LoadMoreButton();
const loadMoreButtonElement = loadMoreButtonObj.getElement();
render(loadMoreButtonElement, boardContainer);

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, function () {
  let counter = 0;
  while (showedTaskCount < taskList.length && counter < CARD_SHOWING) {
    renderCard();
    counter += 1;
  }
  if (showedTaskCount === taskList.length) {
    loadMoreButton.remove();
  }
});
