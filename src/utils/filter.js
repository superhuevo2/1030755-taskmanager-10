import {FILTERS} from '../const.js';
import moment from 'moment';

function isToday(dateObject) {
  if (dateObject === null) {
    return false;
  }

  const today = new Date();

  return moment(dateObject).isSame(moment(today), `day`);
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
  FILTERS.forEach((el) => {
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
  });
  return filterToCount;
}

function getFiltersCounters(tasks) {
  const filterToCount = getFilterToCount(tasks);
  const filterList = Object.keys(filterToCount)
    .map((element) => ({
      name: element,
      count: filterToCount[element]
    }));

  return filterList;
}

export {getFiltersCounters};
