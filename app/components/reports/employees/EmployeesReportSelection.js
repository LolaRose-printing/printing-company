import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import type { Employee } from '../../../dtos/Employee';
import BackButton from '../../../utils/BackButton';
import routes from '../../../constants/routes';
import DateRangeSelector from '../DateRangeSelector';

type Props = {
  history: any,
  employees: Array<Employee>
};

export default class EmployeesReportSelection extends Component<Props> {
  props: Props;

  state = {
    selected: [],
    startDate: null,
    endDate: null
  };

  stateToFilter = (selected, startDate, endDate) => {
    return {
      employeesIds: selected.map(x => x.value),
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    };
  };

  serialize = (selected, startDate, endDate) =>
    JSON.stringify(this.stateToFilter(selected, startDate, endDate));

  dataSelected = state =>
    state.selected.length > 0 && state.startDate && state.endDate;

  render() {
    const { history, employees } = this.props;
    const { startDate, endDate, selected } = this.state;

    const employeesOptions = employees.map(emp => {
      return { value: emp.id, label: emp.name };
    });

    return (
      <div>
        <BackButton history={history} />
        <DateRangeSelector rangeOnChange={x => this.setState(x)} />
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
          <RenderLink filter={this.serialize(selected, startDate, endDate)} />
        ) : null}
      </div>
    );
  }
}

type RenderLinkProps = {
  filter: string
};

class RenderLink extends Component<RenderLinkProps> {
  render() {
    const { filter } = this.props;
    return (
      <Link to={`${routes.SPECIFIC_EMPLOYEES_REPORTS}${filter}`}>
        Generate report.
      </Link>
    );
  }
}
