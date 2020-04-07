import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployeeInfo from '../EmployeeInfo';
import { Table } from 'react-materialize';

export default class EmployeeReport extends Component {
  static propTypes = {
    employee: PropTypes.any.isRequired,
    employeeData: PropTypes.array.isRequired,

    orders: PropTypes.instanceOf(Map).isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
  };

  format = (date) =>
    `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()}`;

  render() {
    const { employee, employeeData, orders, motives, workTypes } = this.props;

    const sum = employeeData.flatMap(x => x.works)
      .map(work => work.amount * workTypes.get(work.workTypeId).employeeWage)
      .reduce((a, b) => a + b, 0);

    return (
      <div className="employee-granular-report">
        <div className="employee-info">
          <EmployeeInfo employee={employee}/>
          <div className="employee-sum">
            {sum} Eur
          </div>
        </div>

        <Table>
          <thead>
          <tr>
            <th data-field="order">Order</th>
            <th data-field="motive">Motive</th>
            <th data-field="date">Date</th>
            <th data-field="workType">Work Type</th>
            <th data-field="amount">Amount</th>
            <th data-field="wage">Wage</th>
          </tr>
          </thead>
          <tbody>
          {employeeData.flatMap(orderData => {
            const order = orders.get(orderData.orderId);
            return orderData.works.map((work, idx) => {
              const workType = workTypes.get(work.workTypeId);
              return (
                <tr key={`order-${order.id}-emp-work-${idx}`}>
                  <td>{order.name}</td>
                  <td>{motives.get(work.motiveId).name}</td>
                  <td>{this.format(new Date(order.date))}</td>
                  <td>{workType.name}</td>
                  <td>{work.amount}</td>
                  <td>{work.amount * workType.employeeWage} Eur</td>
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
