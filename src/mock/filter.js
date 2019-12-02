import {taskList} from './task.js';

const FILTER_NAME = [`all`, `overdue`, `today`, `favorite`, `repeating`, `tags`, `archive`];

function isToday(dateObject) {
  if (dateObject === null) {
    return false;
  }
  const today = new Date();
  return dateObject.getDate() === today.getDate()
      && dateObject.getMonth() === today.getMonth()
      && dateObject.getFullYear() === today.getFullYear();
}

function isRepeating(dayDict) {
  for (let el in dayDict) {
    if (dayDict[el] === true) {
      return true;
    }
  }
  return false;
}

function getCount(filter, tasks) {
  let count = 0;
  switch (filter) {
    case `all`:
      count = tasks.length;
      break;
    case `overdue`:
      tasks.forEach(function (element) {
        if (element.dueDate !== null && element.dueDate.getTime() > Date.now()) {
          count += 1;
        }
      });
      break;
    case `today`:
      tasks.forEach(function (element) {
        if (isToday(element.dueDate)) {
          count += 1;
        }
      });
      break;
    case `favorite`:
      tasks.forEach(function (element) {
        if (element.isFavorite) {
          count += 1;
        }
      });
      break;
    case `repeating`:
      tasks.forEach(function (element) {
        if (isRepeating(element.repeatingDays)) {
          count += 1;
        }
      });
      break;
    case `tags`:
      tasks.forEach(function (element) {
        if (element.tags.size) {
          count += 1;
        }
      });
      break;
    case `archive`:
      tasks.forEach(function (element) {
        if (element.isArchive) {
          count += 1;
        }
      });
      break;
    default:
      break;
  }
  return count;
}

function getFilterList() {
  const filterList = [];
  FILTER_NAME.forEach(function (element) {
    const filterObject = {
      name: element,
    };
    filterObject[`count`] = getCount(filterObject.name, taskList);
    filterList.push(filterObject);
  });
  return filterList;
}

const filterList = getFilterList();

export {filterList, taskList};
