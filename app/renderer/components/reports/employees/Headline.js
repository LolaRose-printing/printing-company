import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Headline extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
  };

  render() {
    const { startDate, endDate } = this.props;

    return (
      <div>
        This is company headline for Employees Report from{' '}
        {startDate.toDateString()} to {endDate.toDateString()}.
      </div>
    );
  }
}
