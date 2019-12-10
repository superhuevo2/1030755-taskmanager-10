import {genTaskList} from './mock/task.js';
import {genFilterList} from './mock/filter.js';
import {RenderPosition} from './const.js';
import {isActiveTask} from './utils.js';
import {render, renderCard} from './render.js'
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Sorter from './components/sorter.js';
import Card from './components/card.js';
import LoadMoreButton from './components/button.js';
import Board from './components/board.js';
import NoTask from './components/no-task.js';
import BoardTasks from './components/board-tasks.js';
import CardEdit from './components/cardEdit.js';

const CARD_SHOWING = 8;
const TASK_COUNT = 22;
const taskList = genTaskList(TASK_COUNT);
const filterList = genFilterList(taskList);
let showedTaskCount = 0;


const menuContainer = document.querySelector(`.main__control`);
const menu = new Menu();
const menuElement = menu.getElement();
render(menuElement, menuContainer);


const main = document.querySelector(`.main`);
const filter = new Filter(filterList);
const filterElement = filter.getElement();
render(filterElement, main);


const board = new Board();
const boardElement= board.getElement();
render(boardElement, main);


const boardContainer = document.querySelector(`.board`);
const sorter = new Sorter();
const sorterElement = sorter.getElement();
render(sorterElement, boardContainer, RenderPosition.AFTERBEGIN);

if (!isActiveTask(taskList)) {
  const noTask = new NoTask();
  const noTaskElement = noTask.getElement();
  render(noTaskElement, boardContainer)
} else {
  const boardTasks = new BoardTasks();
  const boardTasksElement = boardTasks.getElement();
  render(boardTasksElement, boardContainer);

  while (showedTaskCount < CARD_SHOWING) {
    const card = new Card(taskList[showedTaskCount]);
    const cardElement = card.getElement();
    const cardEdit = new CardEdit(taskList[showedTaskCount]);
    const cardEditElement = cardEdit.getElement();

    renderCard(cardElement, cardEditElement, boardTasksElement);
    showedTaskCount++;
  }


  const loadMoreButtonObj = new LoadMoreButton();
  const loadMoreButtonElement = loadMoreButtonObj.getElement();
  render(loadMoreButtonElement, boardContainer);

  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, function () {
    let counter = 0;
    while (showedTaskCount < taskList.length && counter < CARD_SHOWING) {
      const card = new Card(taskList[showedTaskCount]);
      const cardElement = card.getElement();
      const cardEdit = new CardEdit(taskList[showedTaskCount]);
      const cardEditElement = cardEdit.getElement();

      renderCard(cardElement, cardEditElement, boardTasksElement);
      showedTaskCount++
      counter++;
    }
    if (showedTaskCount === taskList.length) {
      loadMoreButton.remove();
    }
  });
}

