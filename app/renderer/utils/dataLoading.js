import staticDataSet from '../../../dist-assets/initialData';

/**
 * Loads employees and returns map of them.
 */
export function loadEmployeeMap(dataSet = staticDataSet.employees) {
  const resultMap = new Map();
  dataSet.forEach(e => resultMap.set(e.id, e));
  return resultMap;
}

/**
 * Loads work types.
 */
export function loadWorkTypes(dataSet = staticDataSet.workTypes) {
  const resultMap = new Map();
  dataSet.forEach(wt => resultMap.set(wt.id, wt));
  return resultMap;
}

/**
 * Loads clients.
 */
export function loadClients(dataSet = staticDataSet.clients) {
  const resultMap = new Map();
  dataSet.forEach(wt => resultMap.set(wt.id, wt));
  return resultMap;
}

/**
 * Loads orders.
 */
export function loadOrders(dataSet = staticDataSet.orders) {
  const resultMap = new Map();
  dataSet.forEach(wt => resultMap.set(wt.id, wt));
  return resultMap;
}
