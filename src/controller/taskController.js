import Card from "../components/card.js";
import CardEdit from "../components/cardEdit.js";
import {render, replaceComponent, removeComponent} from "../utils/render.js";
import {RenderPosition} from '../const.js';
import {mergeTaskData, EMPTY_TASK} from "../utils/utils.js";

const ViewState = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};


class TaskController {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;

    this._card = null;
    this._cardEdit = null;

    this._viewState = ViewState.DEFAULT;

    this._escDownHandler = this._escDownHandler.bind(this);

  }

  render(task) {
    const oldCard = this._card;
    const oldCardEdit = this._cardEdit;

    const isNewTask = false;

    this._card = new Card(task);
    this._cardEdit = new CardEdit(task);

    this._setCardListeners(this._card, task);
    this._setCardEditListeners(this._cardEdit, task, isNewTask);

    if (oldCard && oldCardEdit) {
      replaceComponent(this._card, oldCard);
      replaceComponent(this._cardEdit, oldCardEdit);
    } else {
      render(this._card, this._container);
    }
  }

  renderNewTask() {
    let isNewTask = true;
    this._viewState = ViewState.ADDING;

    const emptyTask = EMPTY_TASK;

    this._card = new Card(emptyTask);
    this._cardEdit = new CardEdit(emptyTask);

    render(this._cardEdit, this._container, RenderPosition.AFTERBEGIN);
    this._setCardEditListeners(this._cardEdit, emptyTask, isNewTask);

    document.addEventListener(`keydown`, this._escDownHandler);
  }

  remove() {
    removeComponent(this._card);
    this._cardEdit.removeCalendar();
    removeComponent(this._cardEdit);
  }

  replaceEditToCard() {
    this._cardEdit.reset();
    this._viewState = ViewState.DEFAULT;

    replaceComponent(this._card, this._cardEdit);
  }

  replaceCardToEdit() {
    this._viewState = ViewState.EDIT;

    replaceComponent(this._cardEdit, this._card);
  }

  setDefaultView() {
    if (this._viewState === ViewState.EDIT) {
      this.replaceEditToCard();

      document.removeEventListener(`keydown`, this._escDownHandler);
    }
  }

  _setCardListeners(card, task) {
    card.setEditHandler(() => {
      this._viewChangeHandler();
      this.replaceCardToEdit();

      document.addEventListener(`keydown`, this._escDownHandler);
    });

    card.setFavoritesHandler(() => {
      const newTask = Object.assign({}, task, {
        isFavorite: !task.isFavorite
      });
      this._dataChangeHandler(this, task, newTask);
    });

    card.setArchiveHandler(() => {
      const newTask = Object.assign({}, task, {
        isArchive: !task.isArchive
      });
      this._dataChangeHandler(this, task, newTask);
    });
  }

  _setCardEditListeners(cardEdit, task, isNewTask) {
    cardEdit.setSubmitHandler((parsedFormData) => {
      const newTask = mergeTaskData(task, parsedFormData);
      let oldTask;

      if (isNewTask) {
        oldTask = null;
        newTask.id = Date.now() + Math.random();
      } else {
        oldTask = task;
      }

      this._dataChangeHandler(this, oldTask, newTask);

      this.replaceEditToCard();

      document.removeEventListener(`keydown`, this._escDownHandler);
    });

    this._cardEdit.setDeleteHandler(() => {
      this._dataChangeHandler(this, task, null);
    });
  }

  _escDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.replaceEditToCard();

      document.removeEventListener(`keydown`, this._escDownHandler);
    }
  }
}

export default TaskController;
