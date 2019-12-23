import {MONTH} from '../const.js';

const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

const isExpired = (date) => {
  return date instanceof Date && date < Date.now();
};

const isRepeating = (days) => {
  return Object.values(days).some(Boolean);
};

const createDate = (date) => {
  return `${date.getDate()} ${MONTH[date.getMonth()]}`;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const createTime = (date) => {
  let hours = castTimeFormat(date.getHours());
  let minutes = castTimeFormat(date.getMinutes());
  let interval = date.getHours() > 11 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
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


export {createElement, isExpired, isRepeating, createDate, createTime, isNotActive, createHashtag};
