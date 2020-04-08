import React, { Component } from 'react';
import 'materialize-css';
import { Button } from 'react-materialize';

export default class PrintButton extends Component {
  render() {
    return (
      <div className="no-print">
        <Button
          className="blue"
          icon={<i className="fa fa-print" aria-hidden="true" />}
          large
          node="button"
          waves="light"
          onClick={() => window.print()}
          fab={{
            direction: 'left',
            hoverEnabled: false,
          }}
          floating
        />
      </div>
    );
  }
}
