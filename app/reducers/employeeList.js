// @flow

import { DELETE_EMPLOYEE, SAVE_EMPLOYEE } from '../actions/EmployeeListActions';
import type { Action } from './types';
import { Employee } from '../dtos/Employee';
import { saveToMap, deleteFromMap } from './common';

export default function employees(
  state: Map<number, Employee> = new Map(),
  action: Action
) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));

  switch (action.type) {
    case SAVE_EMPLOYEE:
      return saveToMap(copyMap, action.payload);
    case DELETE_EMPLOYEE:
      return deleteFromMap(copyMap, action.payload);
    default:
      return state;
  }
}
