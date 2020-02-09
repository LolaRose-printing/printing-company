import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import EmployeeListPage from './containers/EmployeeListPage';
import WorkTypeListPage from './containers/WorkTypeListPage';
import OrdersListPage from './containers/OrdersListPage';
import OrderDetailPage from './containers/OrderDetailPage';
import EmployeesReportsPage from './containers/EmployeesReportsPage';
import EmployeesReportSelectionPage from './constants/EmployeesReportSelectionPage';

export default () => (
  <App>
    <Switch>
      <Route
        path={`${routes.SPECIFIC_EMPLOYEES_REPORTS}:filter?`}
        component={EmployeesReportsPage}
      />

      <Route
        path={routes.EMPLOYEES_REPORTS}
        component={EmployeesReportSelectionPage}
      />

      <Route path={`${routes.ORDER_DETAIL}:id?`} component={OrderDetailPage} />
      <Route path={routes.ORDERS} component={OrdersListPage} />

      <Route path={routes.WORK_TYPES} component={WorkTypeListPage} />
      <Route path={routes.EMPLOYEES} component={EmployeeListPage} />
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
