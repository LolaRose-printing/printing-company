import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';
import DateRangeSelector from '../../tools/DateRangeSelector';
import routes from '../../../../../dist-assets/routes';

export default class EmployeesReportSelection extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
  };

  state = {
    selected: [],
    startDate: null,
    endDate: null,
  };

  stateToFilter = (selected, startDate, endDate) => {
    return {
      employeesIds: selected.map(x => x.value),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
  };

  serialize = (selected, startDate, endDate) =>
    JSON.stringify(this.stateToFilter(selected, startDate, endDate));

  dataSelected = state =>
    state.selected.length > 0 && state.startDate && state.endDate;

  render() {
    const { employees } = this.props;
    const { startDate, endDate, selected } = this.state;

    const employeesOptions = employees.map(emp => {
      return { value: emp.id, label: emp.name };
    });

    return (
      <div>
        <BackButton/>
        <DateRangeSelector rangeOnChange={x => this.setState(x)}/>
        Options
        <Select
          value={selected}
          onChange={x => this.setState({ selected: x || [] })}
          isMulti
          name="employees"
          options={employeesOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {this.dataSelected(this.state) ? (
          <RenderLink filter={this.serialize(selected, startDate, endDate)}/>
        ) : null}
      </div>
    );
  }
}


class RenderLink extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
  };

  render() {
    const { filter } = this.props;
    return (
      <Link to={`${routes.SPECIFIC_EMPLOYEES_REPORTS}${filter}`}>
        Generate report.
      </Link>
    );
  }
}
