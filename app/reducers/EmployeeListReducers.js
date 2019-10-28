// @flow

import { SAVE_EMPLOYEE } from '../actions/EmployeeListActions';
import type { Action } from './types';
import { Employee } from '../dtos/Employee';

export default function employees(
  state: Map<number, Employee> = new Map(),
  action: Action<Employee>
) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));

  switch (action.type) {
    case SAVE_EMPLOYEE:
      copyMap.set(action.payload.id, action.payload);
      return copyMap;
    default:
      return state;
  }
}
