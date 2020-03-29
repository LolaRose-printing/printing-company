import React, { Component } from 'react';
import OrderReport from './OrderReport';
import { getPriceForMultipleOrders } from '../../../utils/PriceComputation';
import PropTypes from 'prop-types';


export default class ClientOrdersReport extends Component {
  static propTypes = {
    client: PropTypes.any.isRequired,
    orders: PropTypes.array.isRequired,
    workTypes: PropTypes.any.isRequired,
  };

  render() {
    const { client, orders, workTypes } = this.props;
    const clientPrice = getPriceForMultipleOrders(orders, workTypes);

    return (
      <div id={`client-${client.id}-orders-report`}>
        Report for client {client.name}.
        <ul>
          {orders.map(order => (
            <li key={`client-${client.id}-order-${order.id}`}>
              <OrderReport order={order} workTypes={workTypes}/>
            </li>
          ))}
        </ul>
        Final price: {clientPrice}.
      </div>
    );
  }
}
