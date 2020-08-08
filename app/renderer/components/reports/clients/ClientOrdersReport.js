import React, { Component } from 'react';
import OrderReport from './OrderReport';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';
import ClientHeadline from './headlines/ClientHeadline';

export default class ClientOrdersReport extends Component {
  static propTypes = {
    client: PropTypes.any.isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { client, workTypes } = this.props;

    return (
      <div className="clients-order-report">
        <div className="client-order-rechnung">Rechnung</div>
        <div className="client-info-box">
          <div className="client-info-headline">
            <ClientHeadline client={client}/>
          </div>
          <div className="final-price">{client.displayPrice} Eur</div>
        </div>

        <div className="clients-orders">
          <Collection>
            {client.orders.map((order, idx) => (
              <CollectionItem key={idx}>
                <OrderReport order={order} workTypes={workTypes}/>
              </CollectionItem>
            ))}
          </Collection>
        </div>
      </div>
    );
  }
}
