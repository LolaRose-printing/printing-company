import React, { Component } from 'react';
import OrderReport from './OrderReport';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';
import ClientHeadline from './headlines/ClientHeadline';
import roundTwoDecimals from '../../../utils/rounding';

const geOrderPrice = (order, workTypes) =>
  order.works
    .map((x) => roundTwoDecimals(workTypes[x.workTypeId].priceForCustomer * (x.amount / 1000)))
    .reduce((a, b) => a + b, 0);

const getPriceForMultipleOrders = (orders, workTypes) =>
  orders.map((x) => geOrderPrice(x, workTypes)).reduce((a, b) => a + b, 0);


export default class ClientOrdersReport extends Component {
  static propTypes = {
    client: PropTypes.any.isRequired,
    orders: PropTypes.array.isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { client, orders, workTypes } = this.props;
    const clientPrice = getPriceForMultipleOrders(orders, workTypes);

    return (
      <div className="clients-order-report">
        <div className="client-info-box">
          <div className="client-info-headline">
            <ClientHeadline client={client} />
          </div>
          <div className="final-price">{clientPrice} Eur</div>
        </div>

        <div className="clients-orders">
          <Collection>
            {orders.map((order, idx) => (
              <CollectionItem key={idx}>
                <OrderReport order={order} workTypes={workTypes} />
              </CollectionItem>
            ))}
          </Collection>
        </div>
      </div>
    );
  }
}
