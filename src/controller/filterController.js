import Filter from '../components/filter.js';
import {render, replaceComponent} from '../utils/render.js';
import {getFiltersCounters} from '../utils/filter.js';


class FilterController {
  constructor(tasksModel, container) {
    this._tasksModel = tasksModel;
    this._container = container;

    this._filter = null;
  }

  render() {
    const filterCounters = getFiltersCounters(this._tasksModel.getTasks());
    this._filter = new Filter(filterCounters);

    render(this._filter, this._container);

    this._tasksModel.setTaskRenewHandler(() => {
      const newfilterCounters = getFiltersCounters(this._tasksModel.getTasks());
      const oldFilter = this._filter;
      this._filter = new Filter(newfilterCounters);
      replaceComponent(this._filter, oldFilter);
    });
  }
}

export default FilterController;
