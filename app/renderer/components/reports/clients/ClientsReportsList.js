import React, { Component } from 'react';
import { getPriceForMultipleOrders } from '../../../utils/PriceComputation';
import Headline from './Headline';
import ClientOrdersReport from './ClientOrdersReport';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';
import PrintButton from '../../tools/PrintButton';

export default class ClientsReportsList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    clients: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const { startDate, endDate, clients, orders, motives, workTypes } = this.props;

    const finalPrice = getPriceForMultipleOrders(orders, workTypes);

    const orderClients = new Set(orders.map(order => order.clientId));

    return (
      <div id="clients-reports-div">
        <BackButton/>

        <PrintButton/>

        <Headline startDate={startDate} endDate={endDate}/>

        <ul>
          {clients
            .filter((client) => orderClients.has(client.id))
            .map((client) => (
              <li key={`client-${client.id}-report`}>
                <ClientOrdersReport
                  client={client}
                  orders={orders.filter((x) => x.clientId === client.id)}
                  motives={motives}
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
