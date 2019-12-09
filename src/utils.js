import {MONTH} from './const.js';

const createElement = function (template) {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
};

const isExpired = function (date) {
  return date instanceof Date && date < Date.now();
};

const isRepeating = function (days) {
  return Object.values(days).some(Boolean);
};

const createDate = function (date) {
  return `${date.getDate()} ${MONTH[date.getMonth()]}`;
};

const castTimeFormat = function (value) {
  return value < 10 ? `0${value}` : String(value);
};

const createTime = function (date) {
  let hours = castTimeFormat(date.getHours());
  let minutes = castTimeFormat(date.getMinutes());
  let interval = date.getHours() > 11 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
};

const isActiveTask = function (taskList) {
 return taskList.reduce((a, b) => a || b.isArchive, false);
}


export {createElement, isExpired, isRepeating, createDate, createTime, isActiveTask};
