import React, { Component } from 'react';
import EmployeeReport from './EmployeeReport';
import Headline from './Headline';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';


export default class EmployeesReportList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    orders: PropTypes.any.isRequired,
    employees: PropTypes.any.isRequired,
    works: PropTypes.any.isRequired,
    workTypes: PropTypes.any.isRequired,
  };

  render() {
    const {
      startDate,
      endDate,
      orders,
      employees,
      works,
      workTypes,
    } = this.props;

    return (
      <div id="employees-report-list">
        <BackButton/>

        <Headline startDate={startDate} endDate={endDate}/>

        <div>
          Records for employees:
          <ul id="report-employees-list">
            {employees.map(emp => (
              <li key={`employee-report-item-${emp.id}`}>
                Record for employee: {emp.name}
                <EmployeeReport
                  startDate={startDate}
                  endDate={endDate}
                  orders={orders}
                  works={works[emp.id]}
                  employee={emp}
                  workTypes={workTypes}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
