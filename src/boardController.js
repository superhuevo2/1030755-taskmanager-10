import {render, renderCard, removeComponent} from './render.js';
import Sort from './components/sort.js';
import NoTask from './components/no-task.js';
import BoardTasks from './components/board-tasks.js';
import Card from './components/card.js';
import CardEdit from './components/cardEdit.js';
import LoadMoreButton from './components/button.js';
import {isNotActive} from './utils.js';
import {CARD_SHOWING} from './const.js';

const FIRST_ELEMENT = 0;

const SORT_TYPE_TO_FUNCTION = {
  default: () => 1,
  dateUp: (a, b) => a.dueDate - b.dueDate,
  dateDown: (a, b) => b.dueDate - a.dueDate
};


const renderCards = function (taskList, container, counter, cardForShowing) {
  taskList.slice(counter, counter + cardForShowing)
    .forEach((task) => {
      const card = new Card(task);
      const cardEdit = new CardEdit(task);

      renderCard(card, cardEdit, container);
    });
};


class BoardController {
  constructor(container) {
    this._container = container;
    this._showedTaskCount = 0;
    this._noTaskComponent = new NoTask();
    this._sortComponent = new Sort();
    this._boardTasks = new BoardTasks();
    this._cardComponents = [];
    this._cardEditComponent = null;
    this._loadMoreButton = new LoadMoreButton();
    this._sortedTasks = null;
  }

  render(tasks) {
    this._sortedTasks = tasks;

    if (isNotActive(tasks)) {
      render(this._noTaskComponent, this._container);
      return;
    }
    render(this._sortComponent, this._container);


    const sortClickHandler = (sortType) => {
      this._sortedTasks = Array.from(tasks).sort(SORT_TYPE_TO_FUNCTION[sortType]);

      this._boardTasks.getElement().innerHTML = ``;
      renderCards(this._sortedTasks, this._boardTasks, FIRST_ELEMENT, this._showedTaskCount);
    };
    this._sortComponent.setSortClickHandler(sortClickHandler);
    render(this._boardTasks, this._container);


    renderCards(this._sortedTasks, this._boardTasks, this._showedTaskCount, CARD_SHOWING);
    this._showedTaskCount += CARD_SHOWING;


    const loadMoreClickHandler = () => {
      renderCards(this._sortedTasks, this._boardTasks, this._showedTaskCount, CARD_SHOWING);
      this._showedTaskCount += CARD_SHOWING;
      if (this._showedTaskCount >= tasks.length) {
        removeComponent(this._loadMoreButton);
      }
    };

    if (this._showedTaskCount < tasks.length) {
      render(this._loadMoreButton, this._container);
      this._loadMoreButton.setClickHandler(loadMoreClickHandler);
    }
  }
}

export default BoardController;
