import Filter from '../components/filter.js';
import {render, replaceComponent} from '../utils/render.js';
import {getFiltersCounters} from '../utils/filter.js';


class FilterController {
  constructor(tasksModel, container) {
    this._tasksModel = tasksModel;
    this._container = container;

    this._activeFilter = `all`;
    this._filter = null;

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._changeActiveFilter = this._changeActiveFilter.bind(this);

    this._tasksModel.setDataChangeHandler(this._dataChangeHandler);
  }

  render() {
    const oldFilter = this._filter;

    const filterCounters = getFiltersCounters(this._tasksModel.getTasks());
    this._filter = new Filter(filterCounters);

    this._filter.setChangeFilterHandler(this._changeActiveFilter);

    if (oldFilter) {
      replaceComponent(this._filter, oldFilter);
    } else {
      render(this._filter, this._container);
    }
  }

  _changeActiveFilter(filterId) {
    this._tasksModel.setActiveFilter(filterId);
    this._activeFilter = filterId;
  }

  _dataChangeHandler() {
    this.render();
  }
}

export default FilterController;
