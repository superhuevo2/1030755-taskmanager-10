import {DescriptionItems, Tags, Colors} from '../const.js';


const ONE_WEEK_IN_MS = 24 * 60 * 60 * 1000 * 7;
const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};


/**
 * return random integer. from <= integer < to.
 * @param {number} from
 * @param {number} to
 * @return {number} random integer
 */
function getRandom(from, to) {
  return from + Math.floor(Math.random() * (to - from));
}

function getDate() {
  if (Math.random() > 0.5) {
    const firstDateInMs = Date.now() - ONE_WEEK_IN_MS;
    const lastDateInMs = Date.now() + ONE_WEEK_IN_MS;
    const randomDateInMs = getRandom(firstDateInMs, lastDateInMs);
    return new Date(randomDateInMs);
  } else {
    return null;
  }
}

function getRepeatingDays() {
  return Object.assign({}, DefaultRepeatingDays, {
    'mo': Math.random() > 0.5
  });
}

function getTags() {
  const tagCount = getRandom(0, 4);
  const tagSet = new Set();
  while (tagSet.size < tagCount) {
    tagSet.add(Tags[getRandom(0, Tags.length)]);
  }
  return tagSet;
}

function genTask() {
  const task = {
    description: DescriptionItems[
        getRandom(0, DescriptionItems.length)
    ],
    dueDate: getDate(),
    repeatingDays: getRepeatingDays(),
    tags: getTags(),
    color: Colors[getRandom(0, Colors.length)],
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };

  return task;
}

function genTaskList(count) {
  return Array(...Array(count))
    .map(genTask);
}

export {genTaskList};
