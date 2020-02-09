import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import type { Employee } from '../../../dtos/Employee';
import BackButton from '../../../utils/BackButton';
import routes from '../../../constants/routes';

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

  stateToFilter = state => {
    return {
      employeesIds: state.selected.map(x => x.value),
      startDate: new Date(state.startDate),
      endDate: new Date(state.endDate)
    };
  };

  serialize = () => JSON.stringify(this.stateToFilter(this.state));

  render() {
    const { history, employees } = this.props;
    const { startDate, endDate, selected } = this.state;

    const employeesOptions = employees.map(emp => {
      return { value: emp.id, label: emp.name };
    });

    return (
      <div>
        <BackButton history={history} />
        Start date
        <DatePicker
          label="StartDate"
          onChange={x => this.setState({ startDate: x })}
          selected={startDate}
        />
        End date
        <DatePicker
          label="EndDate"
          onChange={x => this.setState({ endDate: x })}
          selected={endDate}
        />
        Options
        <Select
          value={selected}
          onChange={x => this.setState({ selected: x })}
          isMulti
          name="employees"
          options={employeesOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Link to={`${routes.SPECIFIC_EMPLOYEES_REPORTS}${this.serialize()}`}>
          Generate report.
        </Link>
      </div>
    );
  }
}
