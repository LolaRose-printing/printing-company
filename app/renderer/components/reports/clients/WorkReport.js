import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WorkReport extends Component {
  static propTypes = {
    work: PropTypes.any.isRequired,
    motive: PropTypes.any.isRequired,
    workType: PropTypes.any.isRequired,
    showWage: PropTypes.bool.isRequired,
  };

  render() {
    const { work, workType, motive, showWage } = this.props;

    return (
      <div>
        {motive.name} -- {workType.name} -- {work.amount}x -|-
        {showWage ? workType.employeeWage : workType.priceForCustomer}
      </div>
    );
  }
}
