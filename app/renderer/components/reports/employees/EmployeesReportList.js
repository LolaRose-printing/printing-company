import React, { Component } from 'react';
import EmployeeReport from './EmployeeReport';
import Headline from './Headline';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';

export default class EmployeesReportList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    orders: PropTypes.instanceOf(Map).isRequired,
    employees: PropTypes.array.isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    // employeeId to their orderId + works
    employeeData: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const { startDate, endDate, orders, employees, workTypes, employeeData, motives } = this.props;

    return (
      <div id="employees-report-list">
        <BackButton/>

        <div>
          <button type="button" className="no-print" onClick={() => window.print()}>Print</button>
        </div>

        <Headline startDate={startDate} endDate={endDate}/>

        <div>
          Records for employees:
          <ul id="report-employees-list">
            {employees.map((emp, idx) => (
              <li key={idx}>
                Record for employee: {emp.name}
                <EmployeeReport
                  employee={emp}
                  employeeData={employeeData.get(emp.id)}
                  orders={orders}
                  workTypes={workTypes}
                  motives={motives}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
