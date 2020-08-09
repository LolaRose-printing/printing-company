import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import cs from 'date-fns/locale/cs';
import midnightDay from '../../utils/Midnight';

registerLocale('cs', cs);
setDefaultLocale('cs');

export default class DatePickerWrapper extends Component {
  static propTypes = {
    // either Date or date formatted to string
    initDate: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const date = props.initDate ? props.initDate : new Date();
    this.state = { date: midnightDay(date) };
  }

  update = (date) => {
    const normalized = midnightDay(date);
    this.setState({ date: normalized });
    this.props.onChange(normalized);
  };

  render() {
    const { date } = this.state;

    return (
      <div>
        <DatePicker onChange={this.update} selected={date} dateFormat="dd/MM/yyyy"/>
      </div>
    );
  }
}
