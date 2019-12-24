import {FILTERS} from '../const.js';
import moment from 'moment';

const isOverdue = (date) => {
  return date instanceof Date && moment(date).isAfter(moment());
};

const isToday = (date) => {
  if (date === null) {
    return false;
  }
  const today = new Date();

  return moment(date).isSame(moment(today), `day`);
};

const isRepeating = (days) => {
  return Object.values(days).some(Boolean);
};

const getFilterToCount = (tasks) => {
  const filterToCount = {};
  FILTERS.forEach((el) => {
    filterToCount[el] = 0;
  });
  filterToCount[`all`] = tasks.length;
  tasks.forEach((element) => {
    if (isOverdue(element.dueDate)) {
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
};

const getFiltersCounters = (tasks) => {
  const filterToCount = getFilterToCount(tasks);
  const filterList = Object.keys(filterToCount)
    .map((element) => ({
      name: element,
      count: filterToCount[element]
    }));

  return filterList;
};

export {isOverdue, isToday, isRepeating, getFiltersCounters};
