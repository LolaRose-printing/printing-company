import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

export default class DateRangeSelector extends Component {
  static propTypes = {
    rangeOnChange: PropTypes.func.isRequired,
  };

  state = {
    startDate: null,
    endDate: null,
  };

  onChange = () => {
    const { startDate, endDate } = this.state;
    const { rangeOnChange } = this.props;
    rangeOnChange({ startDate, endDate });
  };

  startChange = (startDate) => this.setState({ startDate }, this.onChange);

  endChange = (endDate) => this.setState({ endDate }, this.onChange);

  render() {
    const { startDate, endDate } = this.state;

    return (
      <div className="range-selector-bot">
        <div className="start">
          <span className="text">From:</span>
          <DatePicker label="StartDate" onChange={this.startChange} selected={startDate}/>
        </div>
        <div className="end">
          <span className="text">To:</span>
          <DatePicker label="EndDate" onChange={this.endChange} selected={endDate}/>
        </div>
      </div>
    );
  }
}
