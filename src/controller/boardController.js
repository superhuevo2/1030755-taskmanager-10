import {render, removeComponent} from '../utils/render.js';
import Sort from '../components/sort.js';
import NoTask from '../components/no-task.js';
import BoardTasks from '../components/board-tasks.js';
import LoadMoreButton from '../components/button.js';
import {isNotActive} from '../utils/utils.js';
import {CARD_SHOWING} from '../const.js';
import TaskController from './taskController.js';
import {isRepeating, isOverdue, isToday} from '../utils/filter.js';

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

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  render() {
    this._tasksModel.setChangeFilterHandler(() => {
      this._rerenderBoard();
    });

    const tasks = this._tasksModel.getFilteredTasks();

    if (isNotActive(tasks) && this._tasksModel.getActiveFilter() !== `archive`) {
      render(this._noTaskComponent, this._container);
      return;
    }

    render(this._sortComponent, this._container);
    this._sortComponent.setSortClickHandler(this._sortTypeChangeHandler);

    render(this._boardTasks, this._container);
    const newTasks = renderCards(tasks, this._boardTasks, this._dataChangeHandler, this._viewChangeHandler, this._showedTaskCount, CARD_SHOWING);
    this._taskControllers = this._taskControllers.concat(newTasks);

    this._showedTaskCount += CARD_SHOWING;

    this._renderLoadMoreButton(tasks);
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
    this._tasksModel.renewTask(oldTask.id, newTask);

    const isRerenderAll = oldTask.isFavorite !== newTask.isFavorite
      || oldTask.isArchive !== newTask.isArchive
      || isRepeating(oldTask) !== isRepeating(newTask)
      || isOverdue(oldTask) !== isOverdue(newTask)
      || oldTask.tags.size !== newTask.tags.size
      || isToday(oldTask) !== isToday(newTask)

    if (isRerenderAll) {
      this._rerenderBoard();
    } else {
      taskController.render(newTask);
    }
  }

  _rerenderBoard() {
    this._container.getElement().innerHTML = ``;

    this._showedTaskCount = FIRST_ELEMENT;

    this._noTaskComponent = new NoTask();
    this._sortComponent = new Sort();
    this._boardTasks = new BoardTasks();
    this._loadMoreButton = new LoadMoreButton();

    this.render();
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
    const newTasks = renderCards(sortedTasks, this._boardTasks, this._dataChangeHandler, this._viewChangeHandler, FIRST_ELEMENT, this._showedTaskCount);
    this._taskControllers = newTasks;

    removeComponent(this._loadMoreButton);
    this._loadMoreButton = new LoadMoreButton();
    this._renderLoadMoreButton(sortedTasks);
  }
}

export default BoardController;
