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
            <CollectionItem href="#">
              <Link to={routes.EMPLOYEES}>to Employees</Link>
            </CollectionItem>

            <CollectionItem href="#">
              <Link to={routes.WORK_TYPES}>to Work Types</Link>
            </CollectionItem>

            <CollectionItem href="#">
              <Link to={routes.CLIENTS}>to Clients</Link>
            </CollectionItem>

            <CollectionItem href="#">
              <Link to={routes.ORDERS}>Orders</Link>
            </CollectionItem>

            <CollectionItem href="#">
              <Link to={routes.EMPLOYEES_REPORTS}>Employee Reports</Link>
            </CollectionItem>

            <CollectionItem href="#">
              <Link to={routes.ORDER_REPORTS}>Orders Reports</Link>
            </CollectionItem>

            <CollectionItem href="#">
              <Link to={routes.SAVE_STATE}>Save work</Link>
            </CollectionItem>
          </Collection>
        </div>

      </div>
    );
  }
}
