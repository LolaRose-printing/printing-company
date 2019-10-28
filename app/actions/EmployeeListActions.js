// @flow

import { Employee } from '../dtos/Employee';

export const SAVE_EMPLOYEE = 'SAVE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

export function saveEmployee(employee: Employee) {
  return {
    type: SAVE_EMPLOYEE,
    payload: employee
  };
}

export function deleteEmployee(employee: Employee) {
  return {
    type: DELETE_EMPLOYEE,
    payload: employee
  };
}
