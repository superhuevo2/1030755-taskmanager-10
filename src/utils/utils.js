import moment from 'moment';


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


export {createElement, isExpired, isRepeating, createDate, createTime, isNotActive, createHashtag};
