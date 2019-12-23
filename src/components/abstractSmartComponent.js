import AbstractComponent from "./abstractComponent.js";

class AbstractSmartComponent extends AbstractComponent {

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = this._element.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}

export default AbstractSmartComponent;
