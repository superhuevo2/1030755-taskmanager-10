import AbstractComponent from './abstractComponent.js';

const createFilterTemplate = (filters) => {
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
};

class Filter extends AbstractComponent {
  constructor(filterList) {
    super();
    this._filterList = filterList;
  }

  getTemplate() {
    return createFilterTemplate(this._filterList);
  }

  removeElement() {
    this._element = null;
  }
}


export default Filter;
