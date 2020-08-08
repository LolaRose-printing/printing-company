import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmployeeInfo from '../EmployeeInfo';
import { Table } from 'react-materialize';
import { roundThousandsWorks } from '../../../../utils/rounding';
import format from '../../../../utils/dateFormatter';

export default class EmployeeReport extends Component {
  static propTypes = {
    employee: PropTypes.any.isRequired,
    employeeData: PropTypes.array.isRequired,
    employeeWageSum: PropTypes.string.isRequired,
    orders: PropTypes.instanceOf(Object).isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { employee, employeeData,employeeWageSum, orders, workTypes } = this.props;

    return (
      <div className="employee-granular-report">
        <div className="employee-info">
          <EmployeeInfo employee={employee}/>
          <div className="employee-sum">{employeeWageSum} Eur</div>
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
                  <td>{roundThousandsWorks(work.amount * workType.employeeWage)} Eur</td>
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
