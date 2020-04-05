import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../../dist-assets/routes';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';
import AddNewOrder from './AddOrder';


export default class OrdersList extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired,
    clients: PropTypes.array.isRequired,
  };

  render() {
    const { orders, clients, save } = this.props;

    return (
      <div id="order-list-container">
        <BackButton/>

        <Collection id="orders-list">
          {orders.map((wt) => (
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
