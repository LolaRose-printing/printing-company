import React, { Component } from 'react';
import EmployeeReport from './EmployeeReport';
import Headline from '../Headline';
import PropTypes from 'prop-types';
import BackButton from '../../../tools/BackButton';
import PrintButton from '../../../tools/PrintButton';

import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';

export default class EmployeesReportList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    orders: PropTypes.instanceOf(Object).isRequired,
    employees: PropTypes.array.isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
    // employeeId to their orderId + works
    employeeData: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { startDate, endDate, orders, employees, workTypes, employeeData } = this.props;

    return (
      <div id="employees-report-list">
        <BackButton />

        <PrintButton />

        <Headline startDate={startDate} endDate={endDate} />

        <Collection id="report-employees-list">
          {employees.map((emp, idx) => (
            <CollectionItem key={idx}>
              <EmployeeReport
                employee={emp}
                employeeData={employeeData[emp.id]}
                orders={orders}
                workTypes={workTypes}
              />
            </CollectionItem>
          ))}
        </Collection>
      </div>
    );
  }
}
