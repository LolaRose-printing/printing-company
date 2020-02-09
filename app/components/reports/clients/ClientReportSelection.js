import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import BackButton from '../../../utils/BackButton';
import routes from '../../../constants/routes';
import DateRangeSelector from '../DateRangeSelector';
import type { Client } from '../../../dtos/Client';
import type { Order } from '../../../dtos/Order';

type Props = {
  history: any,
  clients: Array<Client>,
  orders: Map<number, Array<Order>>
};

export default class ClientReportSelection extends Component<Props> {
  props: Props;

  state = {
    selectedClients: [],
    selectedOrders: [],
    startDate: null,
    endDate: null
  };

  stateToFilter = state => {
    const { selectedClients, selectedOrders, startDate, endDate } = state;
    return {
      orderIds: selectedClients.map(x => x.value),
      clientIds: selectedOrders.map(x => x.value),
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    };
  };

  serialize = state => JSON.stringify(this.stateToFilter(state));

  dataSelected = () => {
    const { selectedClients, selectedOrders, startDate, endDate } = this.state;

    return (
      selectedClients.length > 0 &&
      selectedOrders.length &&
      startDate &&
      endDate
    );
  };

  render() {
    const { history, clients, orders } = this.props;
    const { selectedClients, selectedOrders } = this.state;

    const clientsOptions = clients.map(cl => {
      return { value: cl.id, label: cl.name };
    });

    const ordersOptions = selectedClients
      .map(x => {
        return { clientName: x.label, clientOrders: orders[x.value] };
      })
      .flatMap(x => {
        return x.clientOrders.map(order => {
          return { value: order.id, label: `${order.name} - ${x.clientName}` };
        });
      });

    return (
      <div>
        <BackButton history={history} />
        <DateRangeSelector rangeOnChange={x => this.setState(x)} />
        Client
        <Select
          value={selectedClients}
          onChange={x => this.setState({ selectedClients: x })}
          isMulti
          name="clients"
          options={clientsOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        Orders
        <Select
          value={selectedOrders}
          onChange={x => this.setState({ selectedOrders: x })}
          isMulti
          name="orders"
          options={ordersOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {this.dataSelected(this.state) ? (
          <RenderLink filter={this.serialize(this.state)} />
        ) : null}
      </div>
    );
  }
}

type RenderLinkProps = {
  filter: string
};

class RenderLink extends Component<RenderLinkProps> {
  render() {
    const { filter } = this.props;
    return (
      <Link to={`${routes.SPECIFIC_ORDER_REPORTS}${filter}`}>
        Generate report.
      </Link>
    );
  }
}
