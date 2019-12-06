import {createElement} from '../utils.js';

const createFilterTemplate = function (filters) {
  let filtersTemplate = ``;
  filters.forEach((filter) => {
    const filterTemplate = (
      `<input
        type="radio"
        id="filter__${filter[`name`]}"
        class="filter__input visually-hidden"
        name="filter"

      />
      <label for="filter__${filter[`name`]}" class="filter__label">
      ${filter[`name`]} <span class="filter__${filter[`name`]}-count">${filter[`count`]}</span></label
      >`
    );
    filtersTemplate += filterTemplate;
  });
  return (
    `<section class="main__filter filter container">
      ${filtersTemplate}
      </section>`
  );
}

class Filter {
  constructor(filterList) {
    this.filterList = filterList;
    this._element = null;
  }

  getTemplate(filters) {
    return createFilterTemplate(filters);
  }

  getElement() {
    if (!this._element) {
      const template = this.getTemplate(this.filterList);
      this._element = createElement(template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}


export default Filter;
