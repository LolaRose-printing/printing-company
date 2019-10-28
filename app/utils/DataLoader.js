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
