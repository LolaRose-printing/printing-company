/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class EmployeeReport extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    orders: PropTypes.any.isRequired,
    employee: PropTypes.any.isRequired,
    works: PropTypes.array.isRequired,
    workTypes: PropTypes.any.isRequired,
  };

  render() {
    const {
      startDate,
      endDate,
      orders,
      employee,
      works,
      workTypes,
    } = this.props;

    // TODO remove this
    console.log(startDate, endDate, orders);

    const wage = works
      .map(x => workTypes.get(x.workTypeId).employeeWage)
      .reduce((a, b) => a + b, 0);

    return (
      <div>
        {employee.name}

        <ul>
          {works.map(work => {
            const workType = workTypes.get(work.workTypeId);
            return (
              <li
                key={`employee-${employee.id}-work-order-${work.orderId}-rec-${work.recordId}`}
              >
                Worked - {work.amount} - what - {workType.name}
              </li>
            );
          })}

          Final wage is then - {wage} Kc.
        </ul>
      </div>
    );
  }
}
