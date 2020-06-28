import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';
import EmployeeInfo from '../EmployeeInfo';
import BackButton from '../../../tools/BackButton';
import PrintButton from '../../../tools/PrintButton';
import Headline from '../Headline';

export default class EmployeeTaxCard extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    employee: PropTypes.any.isRequired,
    wage: PropTypes.number.isRequired,
  };

  render() {
    const { startDate, endDate, employee, wage } = this.props;

    return (
      <div id="employees-report-list">
        <BackButton/>

        <PrintButton/>

        <Headline startDate={startDate} endDate={endDate}/>

        <EmployeeInfo employee={employee}/>

        <div>
          TODO SOME INFO ABOUT WAGE {wage}
        </div>
      </div>
    );
  }
}
