import employees from '../constants/initialEmployees';

/**
 * Loads employees and returns map of them.
 */
export default function loadEmployeeMap() {
  const resultMap = new Map();
  employees.employees.forEach(e => resultMap.set(e.id, e));
  return resultMap;
}
