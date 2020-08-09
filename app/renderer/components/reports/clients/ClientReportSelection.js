import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';

import routes from '../../../data/routes';
import DateRangeSelector from '../../tools/DateRangeSelector';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';
import { Button } from 'react-materialize';
import midnightDay from '../../../utils/Midnight';
import format from '../../../utils/dateFormatter';

export default class ClientReportSelection extends Component {
  static propTypes = {
    clientsOrders: PropTypes.instanceOf(Object).isRequired,
    clients: PropTypes.array.isRequired,
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
      startDate: midnightDay(startDate),
      endDate: midnightDay(endDate),
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
    const date = midnightDay(dateStr);
    return midnightDay(startDate) <= date && date <= midnightDay(endDate);
  };

  render() {
    const { clients, clientsOrders } = this.props;
    const { selectedClients, selectedOrders } = this.state;

    const clientsOptions = clients.map((cl) => {
      return { value: cl.id, label: cl.name };
    });

    const ordersOptions = selectedClients
      .map((x) => {
        return {
          clientName: x.label,
          clientOrders: clientsOrders[x.value].filter((o) => this.rangeFilter(o.date)),
        };
      })
      .flatMap((x) => {
        return x.clientOrders.map((order) => {
          return { value: order.id, label: `${order.name} - ${format(x.date)}` };
        });
      });

    return (
      <div>
        <BackButton/>

        <div className="client-report-selection">
          <DateRangeSelector rangeOnChange={(x) => this.setState(x)}/>

          <div className="selection-container">
            <div className="data-selector">
              <span className="selection-label">Zákazníci</span>
              <Select
                placeholder="Vyber zákazníky"
                value={selectedClients}
                onChange={(x) => this.setState({ selectedClients: x || [] })}
                isMulti
                name="clients"
                options={clientsOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="data-selector">
              <span className="selection-label">Objednávky</span>
              <Select
                placeholder="Vyber objednávky"
                value={selectedOrders}
                onChange={(x) => this.setState({ selectedOrders: x || [] })}
                isMulti
                name="orders"
                options={ordersOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="link-to-detail">
              {Object.keys(ordersOptions).length ? (
                <Button className="red" node="div" waves="light"
                        onClick={() => this.setState({ selectedOrders: ordersOptions })}
                        disabled={selectedOrders.length === ordersOptions.length}
                >
                  Vyber všechny
                </Button>
              ) : (<div/>)}

              {this.dataSelected(this.state) ? (
                <RenderLink filter={this.serialize(this.state)}/>
              ) : null}
            </div>
          </div>
        </div>
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

    return (
      <Link to={`${routes.SPECIFIC_ORDER_REPORTS}${filter}`}>
        <Button className="red" node="div" waves="light">
          Vytvořit fakturu
        </Button>
      </Link>
    );
  }
}
