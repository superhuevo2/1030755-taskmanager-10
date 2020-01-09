import {FILTERS} from '../const.js';
import moment from 'moment';

const filterToCondition = {
  all: (task) => !task.isArchive,
  overdue: (task) => isOverdue(task.dueDate) && !task.isArchive,
  today: (task) => isToday(task.dueDate) && !task.isArchive,
  favorite: (task) => task.isFavorite && !task.isArchive,
  repeating: (task) => isRepeating(task.repeatingDays) && !task.isArchive,
  tags: (task) => task.tags.size && !task.isArchive,
  archive: (task) => task.isArchive
};

const isOverdue = (date) => {
  return date instanceof Date && moment(date).isBefore(moment());
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
    filterToCount[el] = tasks.filter(filterToCondition[el]).length;
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

export {isOverdue, isToday, isRepeating, getFiltersCounters, filterToCondition};
