import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

export default class EmployeeInfo extends Component {
  static propTypes = {
    employee: PropTypes.instanceOf(Object).isRequired,
  };

  showIco = employee => (<div className="identification-number">IČO: {employee.identificationNumber}</div>);

  showsocialSecurityNumber = employee => (<div className="social-security">Datum narození: {employee.socialSecurityNumber}</div>);

  render() {
    const { employee } = this.props;

    return (
      <div className="employee-report-info">
        <div className="name">
          {employee.name} {employee.surname}
        </div>
        <div className="address">{employee.address}</div>

        {employee.socialSecurityNumber ? this.showsocialSecurityNumber(employee) : null}
        {employee.identificationNumber ? this.showIco(employee) : null}

      </div>
    );
  }
}
