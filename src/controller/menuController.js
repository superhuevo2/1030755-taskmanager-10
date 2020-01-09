import Menu from '../components/menu.js';


class MenuController {
  constructor(tasksModel, container) {
    this._tasksModel = tasksModel;
    this._container = container;

    this._menu = new Menu();
  }

  render() {
    this._menu.setClickNewTaskHandler(() => {

    });
  }
}


export default MenuController;
