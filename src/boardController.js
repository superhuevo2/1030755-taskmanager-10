import {render, removeComponent, replaceCard} from './render.js';
import Sorter from './components/sorter.js';
import NoTask from './components/no-task.js';
import BoardTasks from './components/board-tasks.js';
import Card from './components/card.js';
import CardEdit from './components/cardEdit.js';
import LoadMoreButton from './components/button.js';
import {isNotActive} from './utils.js';
import {CARD_SHOWING, KEY_CODE_ESC} from './const.js';


const renderCard = function (cardComponent, cardEditComponent, container) {
  const escDownHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      evt.preventDefault();
      replaceCard(cardComponent, cardEditComponent);
      document.removeEventListener(`keydown`, escDownHandler);
    }
  };
  const editHandler = function (evt, cardEdit, card) {
    evt.preventDefault();
    replaceCard(cardEdit, card);

    document.addEventListener(`keydown`, escDownHandler);
  };
  const submitHandler = function (evt, card, cardEdit) {
    evt.preventDefault();
    replaceCard(card, cardEdit);

    document.removeEventListener(`keydown`, escDownHandler);
  };

  cardComponent.setEditHandler(function (evt) {
    editHandler(evt, cardEditComponent, cardComponent);
  });
  cardEditComponent.setSubmitHandler(function (evt) {
    submitHandler(evt, cardComponent, cardEditComponent);
  });

  render(cardComponent, container);
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

    while (this._showedTaskCount < tasks.length && this._showedTaskCount < CARD_SHOWING) {
      this._cardComponent = new Card(tasks[this._showedTaskCount]);
      this._cardEditComponent = new CardEdit(tasks[this._showedTaskCount]);

      renderCard(this._cardComponent, this._cardEditComponent, this._boardTasks);
      this._showedTaskCount++;
    }

    const loadMoreClickHandler = () => {
      let counter = 0;
      while (this._showedTaskCount < tasks.length && counter < CARD_SHOWING) {
        this._cardComponent = new Card(tasks[this._showedTaskCount]);
        this._cardEditComponent = new CardEdit(tasks[this._showedTaskCount]);

        renderCard(this._cardComponent, this._cardEditComponent, this._boardTasks);

        this._showedTaskCount++;
        counter++;
      }
      if (this._showedTaskCount === tasks.length) {
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
