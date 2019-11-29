const DESCRIPTION_STRING = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const DAYS_COUNT = 14;
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const ONE_WEEK_IN_MS = ONE_DAY_IN_MS * 7;
const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const TAGS = [`homework`, `theory`, `practice`, `intensive`, `kek`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const TASK_COUNT = 8;

/**
 * return random integer. from <= integer < to.
 * @param {number} from
 * @param {number} to
 */
function getRandom(from, to) {
  return from + Math.floor(Math.random() * (to - from))
}

function getDate() {
  const dateList = [null];
  let firstDate = new Date(
    Date.now() - ONE_WEEK_IN_MS
  );
  for (let i = 0; i < DAYS_COUNT; i++) {
    let date = new Date(firstDate.valueOf() + ONE_DAY_IN_MS * i);
    dateList.push(date);
  }
  return dateList;
};

function getDays() {
  const dayDict = {};

  DAYS.forEach((el) => {
    dayDict[el] = Boolean(getRandom(0,2));
  });
  return dayDict;
}

function getTags() {
  const tagCount = getRandom(0, 4);
  const tagSet = new Set();
  while (tagSet.size < tagCount) {
    tagSet.add(TAGS[getRandom(0, TAGS.length)])
  }
  return tagSet
};

function genTask() {
  const task = {
    description: DESCRIPTION_STRING[
        getRandom(0, DESCRIPTION_STRING.length)
      ],
    dueDate: getDate()[getRandom(0, DAYS_COUNT)],
    repeatingDays: getDays(),
    tags: getTags(),
    color: COLORS[getRandom(0, COLORS.length)],
    isFavorite: Boolean(getRandom(0,2)),
    isArchive: Boolean(getRandom(0,2))
  }

  return task;
}

function genTaskList(count) {
  const taskList = Array.apply(null, {length: count});
  taskList.forEach((element, i) => taskList[i] = genTask());
  return taskList;
}

const taskList = genTaskList(TASK_COUNT)

export {taskList};
