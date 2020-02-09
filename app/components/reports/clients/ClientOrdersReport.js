import React, { Component } from 'react';
import Headline from './Headline';
import type { Order } from '../../../dtos/Order';
import type { Client } from '../../../dtos/Client';
import BackButton from '../../../utils/BackButton';

type Props = {
  history: any,
  client: Client,
  startDate: Date,
  endDate: Date,
  orders: Array<Order>
};

export default class ClientOrdersReport extends Component<Props> {
  props: Props;

  state = {
    selectedClientId: null
  };

  render() {
    const { history, client, orders, startDate, endDate } = this.props;
    const { selectedClientId } = this.state;

    return (
      <div id="orders-report-div">
        <BackButton history={history} />

        <Headline startDate={startDate} endDate={endDate} />
      </div>
    );
  }
}
