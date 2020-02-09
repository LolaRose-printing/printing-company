import React, { Component } from 'react';
import type { Order } from '../../../dtos/Order';
import type { Client } from '../../../dtos/Client';
import type { WorkType } from '../../../dtos/WorkType';
import OrderReport from './OrderReport';
import { getPriceForMultipleOrders } from '../../../utils/PriceComputation';

type Props = {
  client: Client,
  orders: Array<Order>,
  workTypes: Map<number, WorkType>
};

export default class ClientOrdersReport extends Component<Props> {
  props: Props;

  render() {
    const { client, orders, workTypes } = this.props;
    const clientPrice = getPriceForMultipleOrders(orders, workTypes);

    return (
      <div id={`client-${client.id}-orders-report`}>
        Report for client {client.name}.
        <ul>
          {orders.map(order => (
            <li key={`client-${client.id}-order-${order.id}`}>
              <OrderReport order={order} workTypes={workTypes} />
            </li>
          ))}
        </ul>
        Final price: {clientPrice}.
      </div>
    );
  }
}
