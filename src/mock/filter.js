import {Filters} from '../const.js';

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

function getFilterToCount(tasks) {
  const filterToCount = {};
  Filters.forEach((el) => {
    filterToCount[el] = 0;
  });
  filterToCount[`all`] = tasks.length;
  tasks.forEach((element) => {
    if (element.dueDate !== null && element.dueDate.getTime() > Date.now()) {
      filterToCount[`overdue`] += 1;
    }
    if (isToday(element.dueDate)) {
      filterToCount[`today`] += 1;
    }
    if (element.isFavorite) {
      filterToCount[`favorite`] += 1;
    }
    if (isRepeating(element.repeatingDays)) {
      filterToCount[`repeating`] += 1;
    }
    if (element.tags.size) {
      filterToCount[`tags`] += 1;
    }
    if (element.isArchive) {
      filterToCount[`archive`] += 1;
    }
  })
  return filterToCount;
}

function genFilterList(tasks) {
  const filterToCount = getFilterToCount(tasks);
  const filterList = Object.keys(filterToCount)
    .map((element) => ({
      name: element,
      count: filterToCount[element]
    }))

  return filterList;
}

export {genFilterList};
