import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../dist-assets/routes';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h2>Home</h2>
        <ul>
          <li>
            <Link to={routes.EMPLOYEES}>to Employees</Link>
          </li>
          <li>
            <Link to={routes.WORK_TYPES}>to Work Types</Link>
          </li>

          <li>
            <Link to={routes.CLIENTS}>to Clients</Link>
          </li>

          <li>
            <Link to={routes.ORDERS}>Orders</Link>
          </li>

          <li>
            <Link to={routes.EMPLOYEES_REPORTS}>Employee Reports</Link>
          </li>

          <li>
            <Link to={routes.ORDER_REPORTS}>Orders Reports</Link>
          </li>

          <li>
            <Link to={routes.SAVE_STATE}>Save work</Link>
          </li>
        </ul>
      </div>
    );
  }
}
