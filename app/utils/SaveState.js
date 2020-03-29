import * as storage from 'electron-json-storage';
import {
  loadClients,
  loadEmployeeMap,
  loadOrders,
  loadWorkTypes
} from './DataLoader';

function initStorage() {
  // TODO Maybe change this?
  const path = storage.getDefaultDataPath();
  console.log(`Setting save path as: ${path}`);
  storage.setDataPath(path);
}

export function convertState(state) {
  return {
    state: {
      employees: [...state.employees.values()],
      workTypes: [...state.workTypes.values()],
      clients: [...state.clients.values()],
      orders: [...state.orders.values()]
    }
  };
}

export function saveState(state) {
  const converted = convertState(state);
  initStorage();
  storage.set('state', converted);
}

function convertToState(data) {
  return {
    employees: loadEmployeeMap(data.employees),
    workTypes: loadWorkTypes(data.workTypes),
    clients: loadClients(data.clients),
    orders: loadOrders(data.orders)
  };
}

export function loadState(stateCallback) {
  initStorage();

  storage.get('state', (error, data) => {
    if (data) {
      stateCallback(convertToState(data.state));
    } else {
      console.log(error);
      stateCallback(
        convertToState({
          employees: [],
          workTypes: [],
          clients: [],
          orders: []
        })
      );
    }
  });
}
