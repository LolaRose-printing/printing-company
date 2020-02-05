import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  initDate: Date,
  onChange: Date => void
};

export default class DatePickerWrapper extends Component<Props> {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/destructuring-assignment
    this.state = { date: new Date(this.props.initDate) };
  }

  update = date => {
    this.setState({ date });
    // eslint-disable-next-line react/destructuring-assignment
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
