import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Headline extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
  };

  format = (date) => `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()}`;

  render() {
    const { startDate, endDate } = this.props;

    return (
      <div className="employee-report-headline">
        <div className="cadek-name">Cadek</div>
        <div className="cadek-address">Cihlářská 648, Domažlice</div>
        <div className="report-dates">
          From: {this.format(startDate)} To: {this.format(endDate)}
        </div>
      </div>
    );
  }
}
