import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

type Props = {
  rangeOnChange: any => void
};

export default class DateRangeSelector extends Component<Props> {
  props: Props;

  state = {
    startDate: null,
    endDate: null
  };

  onChange = () => {
    const { startDate, endDate } = this.state;
    const { rangeOnChange } = this.props;
    rangeOnChange({ startDate, endDate });
  };

  startChange = startDate => this.setState({ startDate }, this.onChange);

  endChange = endDate => this.setState({ endDate }, this.onChange);

  render() {
    const { startDate, endDate } = this.state;

    return (
      <div>
        Start date
        <DatePicker
          label="StartDate"
          onChange={this.startChange}
          selected={startDate}
        />
        End date
        <DatePicker
          label="EndDate"
          onChange={this.endChange}
          selected={endDate}
        />
      </div>
    );
  }
}
