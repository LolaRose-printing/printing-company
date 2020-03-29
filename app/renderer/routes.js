import React from 'react';

import routes from '../../dist-assets/routes';

import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import SavePage from './containers/SavePage';
import WorkTypeListPage from './containers/WorkTypeListPage';
import EmployeeListPage from './containers/EmployeeListPage';
import OrderDetailPage from './containers/OrderDetailPage';
import OrdersListPage from './containers/OrdersListPage';
import ClientsReportsListPage from './containers/ClientsReportsListPage';
import ClientReportSelectionPage from './containers/ClientReportSelectionPage';
import EmployeesReportSelectionPage from './containers/EmployeesReportSelectionPage';
import EmployeesReportListPage from './containers/EmployeesReportListPage';

export default (
  <Switch>
    <Route path={routes.EMPLOYEES_REPORTS} component={EmployeesReportSelectionPage}/>
    <Route path={`${routes.SPECIFIC_EMPLOYEES_REPORTS}:filter?`} component={EmployeesReportListPage}/>

    <Route path={routes.ORDER_REPORTS} component={ClientReportSelectionPage}/>
    <Route path={`${routes.SPECIFIC_ORDER_REPORTS}:filter?`} component={ClientsReportsListPage}/>

    <Route path={`${routes.ORDER_DETAIL}:id?`} component={OrderDetailPage}/>
    <Route path={routes.ORDERS} component={OrdersListPage}/>

    <Route path={routes.SAVE_STATE} component={SavePage}/>

    <Route path={routes.WORK_TYPES} component={WorkTypeListPage}/>
    <Route path={routes.EMPLOYEES} component={EmployeeListPage}/>
    <Route path={routes.HOME} component={HomePage}/>
  </Switch>
);
