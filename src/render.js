import {RenderPosition} from './const.js';

const render = (component, container, place = RenderPosition.BEFOREEND) => {
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


const replaceComponent = (newComponent, oldComponent) => {
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const parentElement = oldElement.parentElement;

  const isElementsExist = !!(newElement && oldElement && parentElement);

  if (isElementsExist && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};


const removeComponent = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {render, removeComponent, replaceComponent};
