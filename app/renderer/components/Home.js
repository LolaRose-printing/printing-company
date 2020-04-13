import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../data/routes';
import 'materialize-css';
import { Collection, CollectionItem } from 'react-materialize';

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <h2>Domov</h2>

        <div id="links">
          <Collection>
            <CollectionItem key="employees">
              <Link to={routes.EMPLOYEES}>Zaměstnanci</Link>
            </CollectionItem>

            <CollectionItem key="workTypes">
              <Link to={routes.WORK_TYPES}>Typy práce</Link>
            </CollectionItem>

            <CollectionItem key="clients">
              <Link to={routes.CLIENTS}>Zákazníci</Link>
            </CollectionItem>

            <CollectionItem key="orders">
              <Link to={routes.ORDERS}>Objednávky</Link>
            </CollectionItem>

            <CollectionItem key="employee-reports">
              <Link to={routes.EMPLOYEES_REPORTS}>Přehled pracovníka</Link>
            </CollectionItem>

            <CollectionItem key="orders-reports">
              <Link to={routes.ORDER_REPORTS}>Vytvořit fakturu</Link>
            </CollectionItem>

            <CollectionItem key="save">
              <Link to={routes.SAVE_STATE}>Uložit práci</Link>
            </CollectionItem>
          </Collection>
        </div>
      </div>
    );
  }
}
