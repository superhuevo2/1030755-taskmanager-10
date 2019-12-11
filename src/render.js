import {RenderPosition} from './const.js';

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


const removeComponent = function (component) {
  component.getElement().remove();
  component.removeElement();
};

export {render, removeComponent, replaceCard};
