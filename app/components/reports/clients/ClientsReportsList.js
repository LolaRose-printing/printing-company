import React, { Component } from 'react';
import type { Order } from '../../../dtos/Order';
import type { Client } from '../../../dtos/Client';
import type { WorkType } from '../../../dtos/WorkType';
import { getPriceForMultipleOrders } from '../../../utils/PriceComputation';
import Headline from './Headline';
import ClientOrdersReport from './ClientOrdersReport';
import BackButton from '../../../utils/BackButton';

type Props = {
  history: any,
  startDate: Date,
  endDate: Date,
  clients: Array<Client>,
  orders: Array<Order>,
  workTypes: Map<number, WorkType>
};

export default class ClientsReportsList extends Component<Props> {
  props: Props;

  render() {
    const {
      history,
      startDate,
      endDate,
      clients,
      orders,
      workTypes
    } = this.props;

    const finalPrice = getPriceForMultipleOrders(orders, workTypes);

    return (
      <div id="clients-reports-div">
        <BackButton history={history} />
        <Headline startDate={startDate} endDate={endDate} />
        <ul>
          {clients.map(client => (
            <li key={`client-${client.id}-report`}>
              <ClientOrdersReport
                client={client}
                orders={orders.filter(x => x.clientId === client.id)}
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
