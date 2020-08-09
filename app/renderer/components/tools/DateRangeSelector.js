import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import midnightDay from '../../utils/Midnight';

export default class DateRangeSelector extends Component {
  static propTypes = {
    rangeOnChange: PropTypes.func.isRequired,
    startDate: PropTypes.oneOf([String, Date]),
    endDate: PropTypes.oneOf([String, Date]),
  };

  state = {
    startDate: null,
    endDate: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate ? midnightDay(props.startDate) : null,
      endDate: props.endDate ? midnightDay(props.endDate) : null,
    };
  }

  onChange = () => {
    const { startDate, endDate } = this.state;
    const { rangeOnChange } = this.props;
    rangeOnChange({ startDate, endDate });
  };

  startChange = (startDate) => this.setState({ startDate: midnightDay(startDate) }, this.onChange);

  endChange = (endDate) => this.setState({ endDate: midnightDay(endDate) }, this.onChange);

  render() {
    const { startDate, endDate } = this.state;

    return (
      <div className="range-selector-bot">
        <div className="start">
          <span className="text">Od:</span>
          <DatePicker label="StartDate" onChange={this.startChange} selected={startDate} dateFormat="dd/MM/yyyy"/>
        </div>
        <div className="end">
          <span className="text">Do:</span>
          <DatePicker label="EndDate" onChange={this.endChange} selected={endDate} dateFormat="dd/MM/yyyy"/>
        </div>
      </div>
    );
  }
}
