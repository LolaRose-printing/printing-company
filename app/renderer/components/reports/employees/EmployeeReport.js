import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmployeeReport extends Component {
  static propTypes = {
    employee: PropTypes.any.isRequired,
    employeeData: PropTypes.array.isRequired,

    orders: PropTypes.instanceOf(Map).isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const { employee, employeeData, orders, motives, workTypes } = this.props;

    const wage = employeeData.flatMap(x => x.works)
      .map(work => workTypes.get(work.workTypeId).employeeWage)
      .reduce((a, b) => a + b, 0);
    return (
      <div>
        {employee.name}
        <ul id={`"employee-list-${employee.id}`}>
          {employeeData.flatMap(orderData => {
            const order = orders.get(orderData.orderId);

            return orderData.works.map((work, idx) => {
              const workType = workTypes.get(work.workTypeId);

              return (
                <li key={`order-${order.id}-emp-work-${idx}`}>
                  {order.name} - {motives.get(work.motiveId).name}
                  - {order.date} - {workType.name} - {work.amount}
                  - {work.amount * workType.employeeWage}
                </li>
              );
            });
          })}
        </ul>
        Final wage is then - {wage} Kc.
      </div>
    );
  }
}
