import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../../dist-assets/routes';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

import 'materialize-css';
import { Collection, CollectionItem, Icon, TextInput } from 'react-materialize';
import AddNewOrder from './AddOrder';


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
        (e) => e.name.startsWith(search.join(' ')) || e.name.match(searchPattern),
      );
    } else {
      displayed = orders;
    }
    return displayed;
  };


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
            label="Search"
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
              <Link to={routes.ORDER_DETAIL + JSON.stringify(wt.id)}>{wt.name}</Link>
            </CollectionItem>
          ))}
        </Collection>

        <AddNewOrder
          clients={clients} save={save}/>
      </div>
    );
  }
}
