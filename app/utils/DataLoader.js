import staticDataSet from '../constants/initialData';

/**
 * Loads employees and returns map of them.
 */
export function loadEmployeeMap() {
  const resultMap = new Map();
  staticDataSet.employees.forEach(e => resultMap.set(e.id, e));
  return resultMap;
}

/**
 * Loads work types.
 */
export function loadWorkTypes() {
  const resultMap = new Map();
  staticDataSet.workTypes.forEach(wt => resultMap.set(wt.id, wt));
  return resultMap;
}

/**
 * Loads clients.
 */
export function loadClients() {
  const resultMap = new Map();
  staticDataSet.clients.forEach(wt => resultMap.set(wt.id, wt));
  return resultMap;
}

/**
 * Loads orders.
 */
export function loadOrders() {
  const resultMap = new Map();
  staticDataSet.orders.forEach(wt => resultMap.set(wt.id, wt));
  return resultMap;
}
