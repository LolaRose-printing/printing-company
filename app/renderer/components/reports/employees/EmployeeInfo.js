import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

export default class EmployeeInfo extends Component {
  static propTypes = {
    employee: PropTypes.any.isRequired,
  };

  render() {
    const { employee } = this.props;

    return (
      <div className="employee-report-info">
        <div className="name">
          {employee.name} {employee.surname}
        </div>
        <div className="address">{employee.address}</div>

        <div className="social-security">Rodné číslo: {employee.socialSecurityNumber}</div>

        <div className="identification-number">IČO: {employee.identificationNumber}</div>
      </div>
    );
  }
}
