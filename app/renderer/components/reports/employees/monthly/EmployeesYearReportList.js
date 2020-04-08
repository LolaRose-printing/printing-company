import React, { Component } from 'react';
import Headline from '../Headline';
import PropTypes from 'prop-types';
import BackButton from '../../../tools/BackButton';
import EmployeeYearReport from './EmployeeYearReport';
import PrintButton from '../../../tools/PrintButton';
import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';

export default class EmployeesYearReportList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    employees: PropTypes.array.isRequired,
    // employeeId to their monthly wage
    employeeMonthlyWages: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { startDate, endDate, employees, employeeMonthlyWages } = this.props;

    return (
      <div id="employees-report-list">
        <BackButton />

        <PrintButton />

        <Headline startDate={startDate} endDate={endDate} />

        <Collection id="report-employees-list">
          {employees.map((emp, idx) => (
            <CollectionItem key={idx}>
              <EmployeeYearReport employee={emp} monthlyWage={employeeMonthlyWages[emp.id]} />
            </CollectionItem>
          ))}
        </Collection>
      </div>
    );
  }
}
