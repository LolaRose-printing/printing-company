import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

export default class DatePickerWrapper extends Component {
  static propTypes = {
    initDate: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { date: new Date(this.props.initDate) };
  }

  update = (date) => {
    this.setState({ date });
    this.props.onChange(date.toLocaleString());
  };

  render() {
    const { date } = this.state;

    return (
      <div>
        <DatePicker onChange={this.update} selected={date} />
      </div>
    );
  }
}
