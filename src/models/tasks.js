import {filterToCondition} from '../utils/filter.js';


class TasksModel {
  constructor() {
    this._tasks = [];
    this._activeFilter = `all`;

    this._changeFilterHandler = null;
    this._dataChangeHandler = null;

  }

  getTasks() {
    return this._tasks;
  }

  getFilteredTasks() {
    return this._filterTasks();
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
  }

  addTask(newTask) {
    this._tasks.unshift(newTask);

    this._dataChangeHandler();
  }

  renewTask(id, newTask) {
    this._tasks.some((task, i) => {
      if (task.id === id) {
        this._tasks[i] = newTask;

        this._dataChangeHandler();
        return true;
      }
      return false;
    });
  }

  deleteTask(id) {
    this._tasks = this._tasks.filter((task) => task.id !== id);

    this._dataChangeHandler();
  }

  getActiveFilter() {
    return this._activeFilter;
  }

  setActiveFilter(filter) {
    this._activeFilter = filter;

    this._changeFilterHandler();
  }

  setChangeFilterHandler(handler) {
    this._changeFilterHandler = handler;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler = handler;
  }

  _filterTasks() {
    return this._tasks.filter(filterToCondition[this._activeFilter]);
  }
}

export default TasksModel;
