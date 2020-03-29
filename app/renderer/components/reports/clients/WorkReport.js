import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WorkReport extends Component {
  static propTypes = {
    work: PropTypes.any.isRequired,
    workType: PropTypes.any.isRequired,
    showWage: PropTypes.bool.isRequired,
  };

  render() {
    const { work, workType, showWage } = this.props;

    return (
      <div>
        {work.amount}x -- {workType.name} - | -{' '}
        {showWage ? workType.employeeWage : workType.priceForCustomer}
      </div>
    );
  }
}
