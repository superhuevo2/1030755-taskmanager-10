import {DESCRIPTION_ITEMS, TAGS, COLORS} from '../const.js';


const ONE_WEEK_IN_MS = 604800000;
const DEFAULT_REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

function* genID() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generatorID = genID();


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
  return Object.assign({}, DEFAULT_REPEATING_DAYS, {
    'tu': Math.random() > 0.4,
    'sa': Math.random() > 0.3
  });
}

function getTags() {
  const tagCount = getRandom(0, 4);
  const tagSet = new Set();
  while (tagSet.size < tagCount) {
    tagSet.add(TAGS[getRandom(0, TAGS.length)]);
  }
  return tagSet;
}

function genTask() {
  const task = {
    description: DESCRIPTION_ITEMS[
        getRandom(0, DESCRIPTION_ITEMS.length)
    ],
    dueDate: getDate(),
    repeatingDays: getRepeatingDays(),
    tags: getTags(),
    color: COLORS[getRandom(0, COLORS.length)],
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
    id: generatorID.next().value
  };

  return task;
}

function genTaskList(count) {
  return Array(...Array(count))
    .map(genTask);
}

export {genTaskList};
