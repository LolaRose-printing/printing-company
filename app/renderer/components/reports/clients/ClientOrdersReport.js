import React, { Component } from 'react';
import OrderReport from './OrderReport';
import { getPriceForMultipleOrders } from '../../../utils/PriceComputation';
import PropTypes from 'prop-types';

export default class ClientOrdersReport extends Component {
  static propTypes = {
    client: PropTypes.any.isRequired,
    orders: PropTypes.array.isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const { client, orders, motives, workTypes } = this.props;
    const clientPrice = getPriceForMultipleOrders(orders, workTypes);

    console.log(orders);

    return (
      <div id={`client-${client.id}-orders-report`}>
        Report for client {client.name}.
        <ul>
          {orders.map((order) => (
            <li key={`client-${client.id}-order-${order.id}`}>
              <OrderReport order={order} motives={motives} workTypes={workTypes}/>
            </li>
          ))}
        </ul>
        Final price: {clientPrice}.
      </div>
    );
  }
}
