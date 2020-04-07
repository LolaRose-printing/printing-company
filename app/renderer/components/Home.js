import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../dist-assets/routes';
import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h2>Home</h2>

        <div id="links">
          <Collection>
            <CollectionItem key="employees">
              <Link to={routes.EMPLOYEES}>to Employees</Link>
            </CollectionItem>

            <CollectionItem key="workTypes">
              <Link to={routes.WORK_TYPES}>to Work Types</Link>
            </CollectionItem>

            <CollectionItem key="clients">
              <Link to={routes.CLIENTS}>to Clients</Link>
            </CollectionItem>

            <CollectionItem key="orders">
              <Link to={routes.ORDERS}>Orders</Link>
            </CollectionItem>

            <CollectionItem key="employee-reports">
              <Link to={routes.EMPLOYEES_REPORTS}>Employee Reports</Link>
            </CollectionItem>

            <CollectionItem key="orders-reports">
              <Link to={routes.ORDER_REPORTS}>Orders Reports</Link>
            </CollectionItem>

            <CollectionItem key="save">
              <Link to={routes.SAVE_STATE}>Save work</Link>
            </CollectionItem>
          </Collection>
        </div>
      </div>
    );
  }
}
