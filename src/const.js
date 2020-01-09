const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const TAGS = [`homework`, `theory`, `practice`, `intensive`, `kek`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const MONTH = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const DEFAULT_REPEATING_DAYS = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const FILTERS = [`all`, `overdue`, `today`, `favorite`, `repeating`, `tags`, `archive`];

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const KEY_CODE_ESC = 27;
const CARD_SHOWING = 8;

export {DESCRIPTION_ITEMS, TAGS, COLORS, MONTH, FILTERS, RenderPosition, KEY_CODE_ESC, CARD_SHOWING, DEFAULT_REPEATING_DAYS};
