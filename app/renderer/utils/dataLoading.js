import staticDataSet from '../data/initialData';

/**
 * Loads employees and returns map of them.
 */
export function loadEmployeeMap(dataSet = staticDataSet.employees) {
  const resultMap = {};
  dataSet.forEach((e) => (resultMap[e.id] = e));
  return resultMap;
}

/**
 * Loads work types.
 */
export function loadWorkTypes(dataSet = staticDataSet.workTypes) {
  const resultMap = {};
  dataSet.forEach((e) => (resultMap[e.id] = e));
  return resultMap;
}

/**
 * Loads clients.
 */
export function loadClients(dataSet = staticDataSet.clients) {
  const resultMap = {};
  dataSet.forEach((e) => (resultMap[e.id] = e));
  return resultMap;
}

/**
 * Loads orders.
 */
export function loadOrders(dataSet = staticDataSet.orders) {
  const resultMap = {};
  dataSet.forEach((e) => (resultMap[e.id] = e));
  return resultMap;
}
