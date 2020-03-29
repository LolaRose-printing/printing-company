import React, { Component } from 'react';
import { getPriceForMultipleOrders } from '../../../utils/PriceComputation';
import Headline from './Headline';
import ClientOrdersReport from './ClientOrdersReport';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';

export default class ClientsReportsList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    clients: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired,
    workTypes: PropTypes.any.isRequired,
  };

  render() {
    const { startDate, endDate, clients, orders, workTypes } = this.props;

    const finalPrice = getPriceForMultipleOrders(orders, workTypes);

    return (
      <div id="clients-reports-div">
        <BackButton />
        <Headline startDate={startDate} endDate={endDate} />
        <ul>
          {clients.map((client) => (
            <li key={`client-${client.id}-report`}>
              <ClientOrdersReport
                client={client}
                orders={orders.filter((x) => x.clientId === client.id)}
                workTypes={workTypes}
              />
            </li>
          ))}
        </ul>
        Final price: {finalPrice}.
      </div>
    );
  }
}
