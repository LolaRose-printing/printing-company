import React, { Component } from 'react';

type Props = {
  startDate: Date,
  endDate: Date
};

export default class Headline extends Component<Props> {
  props: Props;

  render() {
    const { startDate, endDate } = this.props;

    return (
      <div>
        This is company headline for report from {startDate} to {endDate}.
      </div>
    );
  }
}
