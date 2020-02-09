import React, { Component } from 'react';
import type { Order, Work } from '../../../dtos/Order';
import type { Employee } from '../../../dtos/Employee';
import type { WorkType } from '../../../dtos/WorkType';

type Props = {
  startDate: Date,
  endDate: Date,
  orders: Map<number, Order>,
  employee: Employee,
  works: Array<Work>,
  workTypes: Map<number, WorkType>
};

export default class EmployeeReport extends Component<Props> {
  props: Props;

  render() {
    const {
      startDate,
      endDate,
      orders,
      employee,
      works,
      workTypes
    } = this.props;

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
