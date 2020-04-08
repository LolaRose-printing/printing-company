import * as storage from 'electron-json-storage';

function initStorage(path = null) {
  if (!path) {
    path = storage.getDefaultDataPath();
  }
  storage.setDataPath(path);
}

export function convertState(state) {
  return {
    state: {
      employees: state.employees,
      workTypes: state.workTypes,
      clients: state.clients,
      orders: state.orders,
    },
  };
}

export function saveState(state, path = null) {
  const converted = convertState(state);
  initStorage(path);
  storage.set('rawAppData', converted);
}


export function loadState(stateCallback, path = null) {
  initStorage(path);

  storage.get('rawAppData', (error, data) => {
    if (data && data !== {}) {
      stateCallback(data.state);
    } else {
      console.log('It was not possible to load data.');
    }
  });
}
