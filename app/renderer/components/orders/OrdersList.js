import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../../dist-assets/routes';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

export default class OrdersList extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  render() {
    const { orders } = this.props;

    return (
      <div id="order-list-div">
        <BackButton/>

        <ul id="orders-list">
          {orders.map((wt) => (
            <li key={wt.id}>
              <Link to={routes.ORDER_DETAIL + JSON.stringify(wt.id)}>{wt.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
