
class TasksModel {
  constructor() {
    this._tasks = [];

    this._taskRenewHandler = null;

  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  renewTask(id, newTask) {
    this._tasks.some((task, i) => {
      if (task.id === id) {
        this._tasks[i] = newTask;
        this._taskRenewHandler();
        return true;
      }
      return false;
    });
  }

  setTaskRenewHandler(handler) {
    this._taskRenewHandler = handler;
  }
}

export default TasksModel;
