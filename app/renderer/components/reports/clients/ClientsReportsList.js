import React, { Component } from 'react';
import CadekHeadline from './headlines/CadekHeadline';
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
    workTypes: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { startDate, endDate, clients, orders, workTypes } = this.props;

    const orderClients = new Set(orders.map((order) => order.clientId));

    return (
      <div id="clients-reports-div">
        <BackButton />

        <PrintButton />

        <CadekHeadline startDate={startDate} endDate={endDate} />

        <ul>
          {clients
            .filter((client) => orderClients.has(client.id))
            .map((client) => (
              <li key={`client-${client.id}-report`}>
                <ClientOrdersReport
                  client={client}
                  orders={orders.filter((x) => x.clientId === client.id)}
                  workTypes={workTypes}
                />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
