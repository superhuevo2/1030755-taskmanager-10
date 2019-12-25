import Card from "../components/card.js";
import CardEdit from "../components/cardEdit.js";
import {render, replaceComponent, removeComponent} from "../utils/render.js";

const ViewState = {
  DEFAULT: `default`,
  EDIT: `edit`
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


    this._card = new Card(task);
    this._cardEdit = new CardEdit(task);

    this._card.setEditHandler(() => {
      this._viewChangeHandler();
      this.replaceCardToEdit();

      document.addEventListener(`keydown`, this._escDownHandler);
    });

    this._card.setFavoritesHandler(() => {
      const newTask = Object.assign({}, task, {
        isFavorite: !task.isFavorite
      });
      this._dataChangeHandler(this, task, newTask);
    });

    this._card.setArchiveHandler(() => {
      const newTask = Object.assign({}, task, {
        isArchive: !task.isArchive
      });
      this._dataChangeHandler(this, task, newTask);
    });

    this._cardEdit.setSubmitHandler(() => {
      const newTask = Object.assign({}, task, this._cardEdit.getChangedInfo());

      this._dataChangeHandler(this, task, newTask);
      this.replaceEditToCard();

      document.removeEventListener(`keydown`, this._escDownHandler);
    });

    if (oldCard && oldCardEdit) {
      replaceComponent(this._card, oldCard);
      replaceComponent(this._cardEdit, oldCardEdit);
    } else {
      render(this._card, this._container);
    }

  }

  remove() {
    removeComponent(this._card);
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

  _escDownHandler(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this.replaceEditToCard();

      document.removeEventListener(`keydown`, this._escDownHandler);
    }
  }
}

export default TaskController;
