import {isOverdue, isToday, isRepeating} from '../utils/filter.js';


class TasksModel {
  constructor() {
    this._tasks = [];
    this._filteredTasks = [];
    this._activeFilter = `all`;

    this._taskRenewHandler = null;
    this._changeFilterHandler = null;

  }

  recoveryListeners() {
    this.setChangeFilterHandler(this._changeFilterHandler);
  }

  getTasks() {
    return this._tasks;
  }

  getFilteredTasks() {
    switch (this._activeFilter) {
      case `all`:
        return this._tasks;
      default:
        return this._filteredTasks;
    }
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  renewTask(id, newTask) {
    this._tasks.some((task, i) => {
      if (task.id === id) {
        this._tasks[i] = newTask;
        this._taskRenewHandler();
        this.recoveryListeners();
        return true;
      }
      return false;
    });
  }

  getActiveFilter() {
    return this._activeFilter;
  }

  setActiveFilter(filter) {
    this._activeFilter = filter;
    this._filterTasks();

  }

  setTaskRenewHandler(handler) {
    this._taskRenewHandler = handler;
  }

  setChangeFilterHandler(handler) {
    this._changeFilterHandler = handler;
  }

  _filterTasks() {
    this._filteredTasks = [];
    switch (this._activeFilter) {
      case `all`:
        this._filteredTasks = this._tasks;
        break;
      case `overdue`:
        this._tasks.forEach((task) => {
          if (isOverdue(task.dueDate)) {
            this._filteredTasks.push(task);
          }
        });
        break;
      case `today`:
        this._tasks.forEach((task) => {
          if (isToday(task.dueDate)) {
            this._filteredTasks.push(task);
          }
        });
        break;
      case `favorite`:
        this._tasks.forEach((task) => {
          if (task.isFavorite) {
            this._filteredTasks.push(task);
          }
        });
        break;
      case `repeating`:
        this._tasks.forEach((task) => {
          if (isRepeating(task.repeatingDays)) {
            this._filteredTasks.push(task);
          }
        });
        break;
      case `tags`:
        this._tasks.forEach((task) => {
          if (task.tags.size) {
            this._filteredTasks.push(task);
          }
        });
        break;
      case `archive`:
        this._tasks.forEach((task) => {
          if (task.isArchive) {
            this._filteredTasks.push(task);
          }
        });
        break;
      default:
        break;
    }

    this._changeFilterHandler(this._filteredTasks);
  }
}

export default TasksModel;
