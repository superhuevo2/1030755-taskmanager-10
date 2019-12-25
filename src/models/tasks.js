import {isOverdue, isToday, isRepeating} from '../utils/filter.js';

const filterToCondition = {
  all: () => true,
  overdue: (task) => isOverdue(task.dueDate) && !task.isArchive,
  today: (task) => isToday(task.dueDate) && !task.isArchive,
  favorite: (task) => task.isFavorite && !task.isArchive,
  repeating: (task) => isRepeating(task) && !task.isArchive,
  tags: (task) => task.tags.size && !task.isArchive,
  archive: (task) => task.isArchive
}


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
        this._filterTasks();
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
    this._filteredTasks = this._tasks.filter(filterToCondition[this._activeFilter]);
    this._changeFilterHandler(this._filteredTasks);
  }
}

export default TasksModel;
