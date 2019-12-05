import {MONTH} from './const.js';

function createElement(template) {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element;
}

function isExpired(date) {
  return date instanceof Date && date < Date.now();
}

function isRepeating(days) {
  return Object.values(days).some(Boolean);
}

function createDate(date) {
  return `${date.getDate()} ${MONTH[date.getMonth()]}`;
}

function castTimeFormat(value) {
  return value < 10 ? `0${value}` : String(value);
}

function createTime(date) {
  let hours = castTimeFormat(date.getHours());
  let minutes = castTimeFormat(date.getMinutes());
  let interval = date.getHours() > 11 ? `PM` : `AM`;

  return `${hours}:${minutes} ${interval}`;
}


export {createElement, isExpired, isRepeating, createDate, createTime};
