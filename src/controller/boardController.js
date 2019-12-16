import {render, removeComponent} from '../render.js';
import Sort from '../components/sort.js';
import NoTask from '../components/no-task.js';
import BoardTasks from '../components/board-tasks.js';
import LoadMoreButton from '../components/button.js';
import {isNotActive} from '../utils.js';
import {CARD_SHOWING} from '../const.js';
import TaskController from './taskController.js';

const FIRST_ELEMENT = 0;

const SORT_TYPE_TO_FUNCTION = {
  default: () => 1,
  dateUp: (a, b) => a.dueDate - b.dueDate,
  dateDown: (a, b) => b.dueDate - a.dueDate
};


const renderCards = (taskList, container, dataChangeHandler, viewChangeHandler, counter, cardForShowing) => {
  return taskList.slice(counter, counter + cardForShowing)
    .map((task) => {
      const taskController = new TaskController(container, dataChangeHandler, viewChangeHandler);
      taskController.render(task);
      return taskController;
    });
};


class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._taskControllers = [];
    this._showedTaskCount = FIRST_ELEMENT;
    this._noTaskComponent = new NoTask();
    this._sortComponent = new Sort();
    this._boardTasks = new BoardTasks();
    this._loadMoreButton = new LoadMoreButton();

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  render(tasks) {
    this._tasks = tasks;
    this._sortedTasks = tasks;

    if (isNotActive(tasks)) {
      render(this._noTaskComponent, this._container);
      return;
    }

    render(this._sortComponent, this._container);
    this._sortComponent.setSortClickHandler(this._sortTypeChangeHandler);

    render(this._boardTasks, this._container);
    const newTasks = renderCards(this._tasks, this._boardTasks, this._dataChangeHandler, this._viewChangeHandler, this._showedTaskCount, CARD_SHOWING);
    this._taskControllers = this._taskControllers.concat(newTasks);

    this._showedTaskCount += CARD_SHOWING;

    this._renderLoadMoreButton(this._tasks);
  }

  _renderLoadMoreButton(tasks) {
    if (this._showedTaskCount >= tasks.length) {
      return;
    }

    const loadMoreClickHandler = () => {
      const newTasks = renderCards(tasks, this._boardTasks, this._dataChangeHandler, this._viewChangeHandler, this._showedTaskCount, CARD_SHOWING);
      this._taskControllers = this._taskControllers.concat(newTasks);
      this._showedTaskCount += CARD_SHOWING;

      if (this._showedTaskCount >= tasks.length) {
        removeComponent(this._loadMoreButton);
      }
    };
    render(this._loadMoreButton, this._container);
    this._loadMoreButton.setClickHandler(loadMoreClickHandler);
  }

  _dataChangeHandler(taskController, oldTask, newTask) {
    this._tasks.some((task, index) => {
      if (task === oldTask) {
        this._tasks[index] = newTask;
        return true;
      }
      return false;
    });
    taskController.remove();
    taskController.render(newTask);
  }

  _viewChangeHandler() {
    this._taskControllers.forEach((taskController) => {
      taskController.setDefaultView();
    });
  }

  _sortTypeChangeHandler(sortType) {
    const sortedTasks = Array.from(this._tasks).sort(SORT_TYPE_TO_FUNCTION[sortType]);

    this._boardTasks.getElement().innerHTML = ``;
    const newTasks = renderCards(sortedTasks, this._boardTasks, this._dataChangeHandler, this._viewChangeHandler, FIRST_ELEMENT, this._showedTaskCount);
    this._taskControllers = newTasks;

    removeComponent(this._loadMoreButton);
    this._loadMoreButton = new LoadMoreButton();
    this._renderLoadMoreButton(sortedTasks);
  }
}

export default BoardController;
