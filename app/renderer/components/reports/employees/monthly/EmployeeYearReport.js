import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmployeeYearReport extends Component {
  static propTypes = {
    employee: PropTypes.any.isRequired,
    monthlyWage: PropTypes.array.isRequired,
  };

  render() {
    const { employee, monthlyWage } = this.props;

    const sum = monthlyWage.reduce((a, b) => a + b.wage, 0);
    return (
      <div>
        {employee.name}
        <ul id={`"employee-list-${employee.id}`}>
          {monthlyWage.map((wage, idx) => (
            <li key={idx}>
              {wage.month} - {wage.wage} Eur
            </li>
          ))}
        </ul>
        Sum - {sum} Kc.
      </div>
    );
  }
}
