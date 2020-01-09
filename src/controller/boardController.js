import {render, removeComponent} from '../utils/render.js';
import Sort from '../components/sort.js';
import NoTask from '../components/no-task.js';
import BoardTasks from '../components/board-tasks.js';
import LoadMoreButton from '../components/button.js';
import {isNotActive, EMPTY_TASK} from '../utils/utils.js';
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
  constructor(tasksModel, container) {
    this._tasksModel = tasksModel;
    this._container = container;

    this._taskControllers = [];
    this._showedTaskCount = FIRST_ELEMENT;

    this._noTaskComponent = new NoTask();
    this._sortComponent = new Sort();
    this._boardTasks = new BoardTasks();
    this._loadMoreButton = new LoadMoreButton();

    this._creatingTaskController = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  render() {
    this._tasksModel.setChangeFilterHandler(() => {
      if (this._creatingTaskController) {
        this._creatingTaskController.remove();
        this._creatingTaskController = null;
      }

      this._updateTasks(CARD_SHOWING);
    });

    const tasks = this._tasksModel.getFilteredTasks();

    if (isNotActive(tasks) && this._tasksModel.getActiveFilter() !== `archive`) {
      render(this._noTaskComponent, this._container);
      return;
    }

    render(this._sortComponent, this._container);
    this._sortComponent.setSortClickHandler(this._sortTypeChangeHandler);

    render(this._boardTasks, this._container);

    this._removeTasks();
    this._renderTasks(tasks, CARD_SHOWING);
  }

  addNewTask() {
    if (this._creatingTaskController) {
      return;
    }

    this._creatingTaskController = new TaskController(this._boardTasks, this._dataChangeHandler, this._viewChangeHandler);
    this._creatingTaskController.renderNewTask();
  }

  _removeTasks() {
    this._taskControllers.forEach((task) => task.remove());
    this._taskControllers = [];
  }

  _renderTasks(tasks, count) {
    const newTasks = renderCards(tasks, this._boardTasks, this._dataChangeHandler, this._viewChangeHandler, this._showedTaskCount, count);

    this._taskControllers = this._taskControllers.concat(newTasks);
    this._showedTaskCount += count;

    this._renderLoadMoreButton(tasks);
  }

  _updateTasks(count) {
    this._removeTasks();

    this._showedTaskCount = 0;

    const tasks = this._tasksModel.getFilteredTasks();

    if (isNotActive(tasks) && this._tasksModel.getActiveFilter() !== `archive`) {
      removeComponent(this._boardTasks);
      removeComponent(this._sortComponent);
      removeComponent(this._loadMoreButton);
      render(this._noTaskComponent, this._container);
      return;
    }

    removeComponent(this._noTaskComponent);

    render(this._sortComponent, this._container);
    this._sortComponent.setSortClickHandler(this._sortTypeChangeHandler);

    render(this._boardTasks, this._container);

    this._renderTasks(tasks, count);
  }

  _renderLoadMoreButton(tasks) {
    removeComponent(this._loadMoreButton);

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
    if (!newTask) {
      if (oldTask !== EMPTY_TASK) {
        this._tasksModel.deleteTask(oldTask.id);
      } else {
        this._creatingTaskController = null;
      }

      taskController.remove();
      this._updateTasks(this._showedTaskCount);
    }

    if (!oldTask) {

      this._tasksModel.addTask(newTask);

      if (this._taskControllers.length >= CARD_SHOWING) {
        const lastTask = this._taskControllers.pop();
        lastTask.remove();
      }

      this._taskControllers.unshift(taskController);

      taskController.render(newTask);
      this._creatingTaskController = null;

      const tasks = this._tasksModel.getFilteredTasks();
      this._renderLoadMoreButton(tasks);
    }

    if (oldTask && newTask) {
      this._tasksModel.renewTask(oldTask.id, newTask);
      this._updateTasks(this._showedTaskCount);
    }
  }

  _viewChangeHandler() {
    this._taskControllers.forEach((taskController) => {
      taskController.setDefaultView();
    });
  }

  _sortTypeChangeHandler(sortType) {
    const tasks = this._tasksModel.getFilteredTasks();
    const sortedTasks = Array.from(tasks).sort(SORT_TYPE_TO_FUNCTION[sortType]);

    this._boardTasks.getElement().innerHTML = ``;

    const count = this._showedTaskCount;
    this._showedTaskCount = 0;
    this._removeTasks();
    this._renderTasks(sortedTasks, count);
  }
}

export default BoardController;
