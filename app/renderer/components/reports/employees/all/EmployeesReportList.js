import React, { Component } from 'react';
import EmployeeReport from './EmployeeReport';
import Headline from '../Headline';
import PropTypes from 'prop-types';
import BackButton from '../../../tools/BackButton';
import PrintButton from '../../../tools/PrintButton';

import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';
import TaxCardButton from '../TaxCardButton';

export default class EmployeesReportList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    orders: PropTypes.instanceOf(Object).isRequired,
    employees: PropTypes.array.isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
    // employeeId to their orderId + works
    employeeData: PropTypes.instanceOf(Object).isRequired,
    // employeeId to their sum per all works
    employeeWagesSums: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { startDate, endDate, orders, employees, workTypes, employeeData, employeeWagesSums } = this.props;

    return (
      <div id="employees-report-list">
        <BackButton/>

        <PrintButton/>

        <Headline startDate={startDate} endDate={endDate}/>

        <Collection id="report-employees-list">
          {employees.map((emp, idx) => (
            <CollectionItem key={idx}>
              <EmployeeReport
                employee={emp}
                employeeData={employeeData[emp.id]}
                employeeWageSum={employeeWagesSums[emp.id]}
                orders={orders}
                workTypes={workTypes}
              />
              <div className="no-print tax-card-button-reports">
                <TaxCardButton startDate={startDate} endDate={endDate} employeeId={emp.id}/>
              </div>
            </CollectionItem>
          ))}
        </Collection>
      </div>
    );
  }
}
