// @flow

import { Employee } from '../dtos/Employee';

export const SAVE_EMPLOYEE = 'SAVE_EMPLOYEE';
export const VIEW_DETAILS = 'VIEW_DETAILS';

export function saveEmployee(employee: Employee) {
  return {
    type: SAVE_EMPLOYEE,
    payload: employee
  };
}

export function viewDetails(id: number) {
  console.log('viewDetails called', id);
  return {
    type: VIEW_DETAILS
  };
}
