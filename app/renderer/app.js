import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import configureStore from './store';
import { loadClients, loadEmployeeMap, loadOrders, loadWorkTypes } from './utils/dataLoading';
import routes from './routes';
import Modal from 'react-modal';

const syncHistoryWithStore = (store, history) => {
  const { router } = store.getState();
  if (router && router.location) {
    history.replace(router.location);
  }
};

const isDevelopment = process.env.NODE_ENV === 'development';

const initialState = isDevelopment ?
  {
    employees: loadEmployeeMap(),
    workTypes: loadWorkTypes(),
    clients: loadClients(),
    orders: loadOrders(),
  } :
  {
    employees: {},
    workTypes: {},
    clients: {},
    orders: {},
  };

const routerHistory = createMemoryHistory();

const store = configureStore(initialState, routerHistory);

syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

Modal.setAppElement(rootElement);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
  </Provider>,
  rootElement,
);
