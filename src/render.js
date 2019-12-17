import {RenderPosition, KEY_CODE_ESC} from './const.js';

const render = function (component, container, place = RenderPosition.BEFOREEND) {
  const element = component.getElement();
  const containerElement = container.getElement ? container.getElement() : container;

  switch (place) {
    case RenderPosition.BEFOREEND:
      containerElement.append(element);
      break;
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(element);
      break;
    default:
      break;
  }
};


const renderCard = function (cardComponent, cardEditComponent, container) {
  const escDownHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      evt.preventDefault();
      replaceComponent(cardComponent, cardEditComponent);
      document.removeEventListener(`keydown`, escDownHandler);
    }
  };
  const editHandler = function (evt, cardEdit, card) {
    evt.preventDefault();
    replaceComponent(cardEdit, card);

    document.addEventListener(`keydown`, escDownHandler);
  };
  const submitHandler = function (evt, card, cardEdit) {
    evt.preventDefault();
    replaceComponent(card, cardEdit);

    document.removeEventListener(`keydown`, escDownHandler);
  };

  cardComponent.setEditHandler(function (evt) {
    editHandler(evt, cardEditComponent, cardComponent);
  });
  cardComponent.setFavoritesHandler();

  cardEditComponent.setSubmitHandler(function (evt) {
    submitHandler(evt, cardComponent, cardEditComponent);
  });

  render(cardComponent, container);
};


const replaceComponent = function (newComponent, oldComponent) {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isElementsExist = !!(newElement && oldElement && parentElement);

  if (isElementsExist && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


const removeComponent = function (component) {
  component.getElement().remove();
  component.removeElement();
};

export {render, renderCard, removeComponent, replaceComponent};
