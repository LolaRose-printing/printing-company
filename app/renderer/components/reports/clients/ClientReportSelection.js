import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import routes from '../../../../../dist-assets/routes';
import DateRangeSelector from '../../tools/DateRangeSelector';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';

export default class ClientReportSelection extends Component {
  static propTypes = {
    orders: PropTypes.any.isRequired,
    clients: PropTypes.any.isRequired,
  };

  state = {
    selectedClients: [],
    selectedOrders: [],
    startDate: null,
    endDate: null,
  };

  stateToFilter = (state) => {
    const { selectedClients, selectedOrders, startDate, endDate } = state;
    return {
      orderIds: selectedOrders.map((x) => x.value),
      clientIds: selectedClients.map((x) => x.value),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
  };

  serialize = (state) => JSON.stringify(this.stateToFilter(state));

  dataSelected = () => {
    const { selectedClients, selectedOrders, startDate, endDate } = this.state;

    return (
      selectedClients &&
      selectedClients.length > 0 &&
      selectedOrders &&
      selectedOrders.length &&
      startDate &&
      endDate
    );
  };

  rangeFilter = (dateStr) => {
    const { startDate, endDate } = this.state;
    const date = new Date(dateStr);
    return new Date(startDate) <= date && date <= new Date(endDate);
  };

  render() {
    const { clients, orders } = this.props;
    const { selectedClients, selectedOrders } = this.state;

    const clientsOptions = clients.map((cl) => {
      return { value: cl.id, label: cl.name };
    });

    const ordersOptions = selectedClients
      .map((x) => {
        return {
          clientName: x.label,
          clientOrders: orders[x.value].filter((o) => this.rangeFilter(o.date)),
        };
      })
      .flatMap((x) => {
        return x.clientOrders.map((order) => {
          return { value: order.id, label: `${order.name} - ${x.clientName}` };
        });
      });

    return (
      <div>
        <BackButton />
        <DateRangeSelector rangeOnChange={(x) => this.setState(x)} />
        Client
        <Select
          value={selectedClients}
          onChange={(x) => this.setState({ selectedClients: x || [] })}
          isMulti
          name="clients"
          options={clientsOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        Orders
        <Select
          value={selectedOrders}
          onChange={(x) => this.setState({ selectedOrders: x || [] })}
          isMulti
          name="orders"
          options={ordersOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
        {this.dataSelected(this.state) ? <RenderLink filter={this.serialize(this.state)} /> : null}
      </div>
    );
  }
}

class RenderLink extends Component {
  static propTypes = {
    filter: PropTypes.any.isRequired,
  };

  render() {
    const { filter } = this.props;

    return <Link to={`${routes.SPECIFIC_ORDER_REPORTS}${filter}`}>Generate report.</Link>;
  }
}
