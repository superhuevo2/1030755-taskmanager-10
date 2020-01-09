import moment from 'moment';
import {COLORS, DEFAULT_REPEATING_DAYS} from '../const.js';

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

const createDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const createTime = (date) => {
  return moment(date).format(`hh:mm A`);
};

const isNotActive = (taskList) => {
  return taskList.reduce((a, b) => a && b.isArchive, true);
};

const createHashtag = (tagSet) => {
  let fragment = ``;
  tagSet.forEach((element) => {
    const template = (
      `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${element}
        </span>
      </span>
      `
    );
    fragment += template;
  });
  return fragment;
};

const mergeTaskData = (task, newData) => {
  return {
    description: newData.description,
    dueDate: newData.dueDate,
    repeatingDays: newData.repeatingDays,
    tags: newData.tags ? new Set([].concat([...task.tags], newData.tags.split(` `))) : task.tags,
    color: newData.color,
    isFavorite: task.isFavorite,
    isArchive: task.isArchive,
    id: task.id
  };
};


const createEmptyTask = () => {
  return {
    description: ``,
    dueDate: null,
    repeatingDays: DEFAULT_REPEATING_DAYS,
    tags: new Set(),
    color: COLORS[0],
    isFavorite: false,
    isArchive: false,
    id: ``
  };
};

const EMPTY_TASK = createEmptyTask();

export {createElement, createDate, createTime, isNotActive, createHashtag, mergeTaskData, createEmptyTask, EMPTY_TASK};
