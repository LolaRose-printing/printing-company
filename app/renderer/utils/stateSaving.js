import * as storage from 'electron-json-storage';
import { loadClients, loadEmployeeMap, loadOrders, loadWorkTypes } from './dataLoading';

function initStorage(path = null) {
  if (!path) {
    path = storage.getDefaultDataPath();
  }
  storage.setDataPath(path);
}

export function convertState(state) {
  return {
    state: {
      employees: [...state.employees.values()],
      workTypes: [...state.workTypes.values()],
      clients: [...state.clients.values()],
      orders: [...state.orders.values()],
    },
  };
}

export function saveState(state, path = null) {
  const converted = convertState(state);
  initStorage(path);
  storage.set('state', converted);
}

function convertToState(data) {
  return {
    employees: loadEmployeeMap(data.employees),
    workTypes: loadWorkTypes(data.workTypes),
    clients: loadClients(data.clients),
    orders: loadOrders(data.orders),
  };
}

export function loadState(stateCallback, path = null) {
  initStorage(path);

  storage.get('state', (error, data) => {
    if (data && data !== {}) {
      console.log(data);
      stateCallback(convertToState(data.state));
    } else {
      console.log(error);
      stateCallback(
        convertToState({
          employees: [],
          workTypes: [],
          clients: [],
          orders: [],
        }),
      );
    }
  });
}
