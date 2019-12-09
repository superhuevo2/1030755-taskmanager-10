import {RenderPosition, KEY_CODE_ESC} from './const.js';

const render = function (element, container, place = RenderPosition.BEFOREEND) {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
    default:
      break;
  }
};

const switchCard = function (newElement, oldElement) {
  const parentElement = oldElement.parentNode;
  parentElement.replaceChild(newElement, oldElement);
};


const renderCard = function (cardElement, cardEditElement, container) {
  const escDownHandler = function (evt) {
    if (evt.keyCode == KEY_CODE_ESC) {
      evt.preventDefault();
      switchCard(cardElement, cardEditElement);
      document.removeEventListener(`keydown`, escDownHandler)
    }
  };

  const editButton = cardElement.querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    switchCard(cardEditElement, cardElement);

    document.addEventListener(`keydown`, escDownHandler);
  });

  const editCardForm = cardEditElement.querySelector(`form`);
  editCardForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    switchCard(cardElement, cardEditElement);

    document.removeEventListener(`keydown`, escDownHandler)
  });

  render(cardElement, container);
};

export {render, renderCard};
