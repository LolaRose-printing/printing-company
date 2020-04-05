import React, { Component } from 'react';
import Headline from '../Headline';
import PropTypes from 'prop-types';
import BackButton from '../../../tools/BackButton';
import EmployeeYearReport from './EmployeeYearReport';

export default class EmployeesYearReportList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    employees: PropTypes.array.isRequired,
    // employeeId to their monthly wage
    employeeMonthlyWages: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const { startDate, endDate, employees, employeeMonthlyWages } = this.props;

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
                <EmployeeYearReport
                  employee={emp}
                  monthlyWage={employeeMonthlyWages.get(emp.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
