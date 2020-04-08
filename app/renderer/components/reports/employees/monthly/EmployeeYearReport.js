import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Table } from 'react-materialize';
import EmployeeInfo from '../EmployeeInfo';

export default class EmployeeYearReport extends Component {
  static propTypes = {
    employee: PropTypes.any.isRequired,
    monthlyWage: PropTypes.array.isRequired,
  };

  render() {
    const { employee, monthlyWage } = this.props;

    const sum = monthlyWage.reduce((a, b) => a + b.wage, 0);
    return (
      <div className="employee-monthly-report">
        <EmployeeInfo employee={employee} />

        <div className="report-data">
          <Table className="employee-monthly-table">
            <thead>
              <tr>
                <th data-field="month">Month</th>
                <th data-field="wage">Wage</th>
              </tr>
            </thead>
            <tbody>
              {monthlyWage.map((wage, idx) => (
                <tr key={idx}>
                  <td>{wage.month}</td>
                  <td>{wage.wage} Eur</td>
                </tr>
              ))}
              <tr className="employee-report-sum">
                <td>Sum</td>
                <td>{sum} Eur</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
