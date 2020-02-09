import React, { Component } from 'react';
import type { Order, Work } from '../../../dtos/Order';
import type { Employee } from '../../../dtos/Employee';
import EmployeeReport from './EmployeeReport';
import Headline from './Headline';
import BackButton from '../../../utils/BackButton';
import type { WorkType } from '../../../dtos/WorkType';

type Props = {
  history: any,
  startDate: Date,
  endDate: Date,
  orders: Map<number, Order>,
  employees: Map<number, Employee>,
  works: Map<number, Array<Work>>, // employee id to work
  workTypes: Map<number, WorkType>
};

export default class EmployeesReportList extends Component<Props> {
  props: Props;

  render() {
    const {
      history,
      startDate,
      endDate,
      orders,
      employees,
      works,
      workTypes
    } = this.props;

    return (
      <div id="employees-report-list">
        <BackButton history={history} />

        <Headline startDate={startDate} endDate={endDate} />

        <div>
          Records for employees:
          <ul id="report-employees-list">
            {employees.map(emp => (
              <li key={`employee-report-item-${emp.id}`}>
                Record for employee: {emp.name}
                <EmployeeReport
                  startDate={startDate}
                  endDate={endDate}
                  orders={orders}
                  works={works[emp.id]}
                  employee={emp}
                  workTypes={workTypes}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
