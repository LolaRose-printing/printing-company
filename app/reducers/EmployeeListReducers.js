// @flow
import { ADD_NEW } from '../actions/EmployeeListActions';
import type { Action } from './types';
import { Employee } from '../dtos/Employee';

export default function employees(
  state: Map<number, Employee> = new Map(),
  action: Action<Employee>
) {
  switch (action.type) {
    case ADD_NEW:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
