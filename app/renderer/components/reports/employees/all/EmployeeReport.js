import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployeeInfo from '../EmployeeInfo';
import { Table } from 'react-materialize';
import roundTwoDecimals from '../../../../utils/rounding';
import format from '../../../../utils/dateFormatter';

export default class EmployeeReport extends Component {
  static propTypes = {
    employee: PropTypes.any.isRequired,
    employeeData: PropTypes.array.isRequired,

    orders: PropTypes.instanceOf(Object).isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { employee, employeeData, orders, workTypes } = this.props;

    const sum = employeeData
      .flatMap((x) => x.works)
      .map((work) => roundTwoDecimals(work.amount * workTypes[work.workTypeId].employeeWage))
      .reduce((a, b) => a + b, 0);

    return (
      <div className="employee-granular-report">
        <div className="employee-info">
          <EmployeeInfo employee={employee} />
          <div className="employee-sum">{sum} Eur</div>
        </div>

        <Table>
          <thead>
            <tr>
              <th data-field="order">Objednávka</th>
              <th data-field="motive">Motiv</th>
              <th data-field="date">Datum</th>
              <th data-field="workType">Typ práce</th>
              <th data-field="amount">Množtví</th>
              <th data-field="wage">Mzda</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.flatMap((orderData) => {
              const order = orders[orderData.orderId];
              return orderData.works.map((work, idx) => {
                const workType = workTypes[work.workTypeId];
                return (
                  <tr key={`order-${order.id}-emp-work-${idx}`}>
                    <td>{order.name}</td>
                    <td>{work.motive}</td>
                    <td>{format(new Date(order.date))}</td>
                    <td>{workType.name}</td>
                    <td>{work.amount}</td>
                    <td>{roundTwoDecimals(work.amount * workType.employeeWage)} Eur</td>
                  </tr>
                );
              });
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
