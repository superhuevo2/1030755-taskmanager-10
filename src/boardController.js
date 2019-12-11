import {render, renderCard, removeComponent} from './render.js';
import Sorter from './components/sorter.js';
import NoTask from './components/no-task.js';
import BoardTasks from './components/board-tasks.js';
import Card from './components/card.js';
import CardEdit from './components/cardEdit.js';
import LoadMoreButton from './components/button.js';
import {isNotActive} from './utils.js';
import {CARD_SHOWING} from './const.js';


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
    this._sortComponent = new Sorter();
    this._boardTasks = new BoardTasks();
    this._cardComponent = null;
    this._cardEditComponent = null;
    this._loadMoreButton = new LoadMoreButton();
  }

  render(tasks) {
    if (isNotActive(tasks)) {
      render(this._noTaskComponent, this._container);
      return;
    }
    render(this._sortComponent, this._container);
    render(this._boardTasks, this._container);

    renderCards(tasks, this._boardTasks, this._showedTaskCount, CARD_SHOWING);
    this._showedTaskCount += CARD_SHOWING;

    const loadMoreClickHandler = () => {
      renderCards(tasks, this._boardTasks, this._showedTaskCount, CARD_SHOWING);
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
