import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';
import BackButton from '../../../tools/BackButton';
import PrintButton from '../../../tools/PrintButton';
import format from '../../../../utils/dateFormatter';

export default class EmployeeTaxCard extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    employee: PropTypes.any.isRequired,
    wage: PropTypes.string.isRequired,
  };

  showIco = employee => (<div className="identification-number">IČO: {employee.identificationNumber}</div>);

  showsocialSecurityNumber = employee => (
    <div className="social-security">Datum narození: {employee.socialSecurityNumber}</div>);


  card = () => {
    const { startDate, endDate, employee, wage } = this.props;

    return (
      <div className="employee-tax-card">
        <div className="employee-tax-card-headline">
          <div className="employee-tax-card-cadek-headline">
            <div className="cadek-name">Pavel Čadek</div>
            <div className="cadek-address">Cihlářská 649, 344 01 Domažlice</div>
            <div className="cadek-ico">IČO 72218088</div>
            <div className="cadek-ico">DIČ CZ7102021773</div>
          </div>

          <div className="employee-tax-card-card-headline">
            <div className="tax-head">Výdajový pokladní doklad</div>
            Od: {format(startDate)}<br/>
            Do: {format(endDate)}<br/>
            Dne: {format(new Date())}<br/>
          </div>

        </div>

        <div className="employee-tax-card-headline">
          <div className="employee-tax-card-cadek-headline">
            <div className="cadek-name">
              {employee.name} {employee.surname}
            </div>
            <div>{employee.address}</div>

            {employee.socialSecurityNumber ? this.showsocialSecurityNumber(employee) : null}
            {employee.identificationNumber ? this.showIco(employee) : null}
          </div>
          <div>
            <div className="reason">
              Účel: <i>Balící činnost</i>
            </div>
            <div className="wage">
              Celkem: <b>{wage} Eur</b>
            </div>
          </div>
        </div>

        <div className="employee-tax-card-bottom">
          <div>Schválil(i):</div>
          <div>Podpis příjemce:</div>
          <div>Podpis pokladníka:</div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="employee-tax-card-base">
        <BackButton/>

        <PrintButton/>

        <div className="employee-tax-card-box">
          {this.card()}
        </div>

        <div className="divider"/>

        <div className="employee-tax-card-box">
          {this.card()}
        </div>
      </div>
    );
  }
}
