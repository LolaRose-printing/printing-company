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
        <div className="cadek-name">Pavel Čadek</div>
        <div className="cadek-address">Cihlářská 649, Domažlice</div>
        <div className="cadek-ico">CZ7102021773</div>
        <div className="report-dates">
          Od: {this.format(startDate)} Do: {this.format(endDate)}
        </div>
      </div>
    );
  }
}
