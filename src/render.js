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


const replaceCard = function (newComponent, oldComponent) {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentNode;
  parentElement.replaceChild(newElement, oldElement);
};

const renderCard = function (cardComponent, cardEditComponent, container) {
  const escDownHandler = function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      evt.preventDefault();
      replaceCard(cardComponent, cardEditComponent);
      document.removeEventListener(`keydown`, escDownHandler)
    }
  };
  const editHandler = function (evt, cardEditComponent, cardComponent) {
    evt.preventDefault();
    replaceCard(cardEditComponent, cardComponent);

    document.addEventListener(`keydown`, escDownHandler);
  };
  const submitHandler = function (evt, cardComponent, cardEditComponent) {
    evt.preventDefault();
    replaceCard(cardComponent, cardEditComponent);

    document.removeEventListener(`keydown`, escDownHandler);
  };

  cardComponent.setEditHandler(function (evt) {
    editHandler(evt, cardEditComponent, cardComponent)
  });
  cardEditComponent.setSubmitHandler(function (evt) {
    submitHandler(evt, cardComponent, cardEditComponent)
  });

  render(cardComponent, container);
};


const removeComponent = function(component) {
  component.getElement().remove();
  component.removeElement();
}

export {render, renderCard, removeComponent, replaceCard};
