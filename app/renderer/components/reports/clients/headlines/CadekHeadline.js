import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CadekHeadline extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
  };

  render() {
    return (
      <div className="employee-report-headline">
        <div className="cadek-name">Pavel Čadek</div>
        <div className="cadek-address">Cihlářská 649, 344 01 Domažlice</div>
        <div className="cadek-ico">IČO 72218088, DIČ CZ7102021773</div>
      </div>
    );
  }
}
