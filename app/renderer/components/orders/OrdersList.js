import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../data/routes';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

import 'materialize-css';
import { Collection, CollectionItem, Icon, TextInput } from 'react-materialize';
import AddNewOrder from './AddOrder';
import format from '../../utils/dateFormatter';
import midnightDay from '../../utils/Midnight';

export default class OrdersList extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired,
    clients: PropTypes.array.isRequired,
  };

  state = {
    search: [],
  };

  selectOrders = (search, orders) => {
    let displayed;
    if (search.length) {
      const searchPattern = new RegExp(search.map((term) => `(?=.*${term})`).join(''), 'i');

      displayed = orders.filter(
        (e) => e.name.match(searchPattern)
          || e.works.filter(w => w.motive.match(searchPattern)).length,
      );
    } else {
      displayed = orders;
    }
    return displayed;
  };

  formatOrderName = order => {
    // TODO unlock this new feature when they need
    // const motives = [...new Set(order.works.map(w => w.motive))].join(', ')
    return `${order.name} - ${format(midnightDay(order.date))}`;
  }

  render() {
    const { orders, clients, save } = this.props;
    const { search } = this.state;
    const displayed = this.selectOrders(search, orders);

    return (
      <div id="order-list-container">
        <BackButton/>

        <div id="search-bar">
          <TextInput
            icon={<Icon>search</Icon>}
            id="employees-search"
            label="Hledej"
            onChange={(e) => {
              const searchValues = e.target.value.split(' ');
              this.setState((state) => ({
                ...state,
                search: searchValues,
              }));
            }}
          />
        </div>

        <Collection id="orders-list">
          {displayed.map((wt) => (
            <CollectionItem key={wt.id}>
              <Link to={routes.ORDER_DETAIL + JSON.stringify(wt.id)}>
                {this.formatOrderName(wt)}
              </Link>
            </CollectionItem>
          ))}
        </Collection>

        <AddNewOrder clients={clients} save={save}/>
      </div>
    );
  }
}
