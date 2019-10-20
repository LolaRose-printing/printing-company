import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { Employee } from '../dtos/Employee';

export type State = {
  +employees: Map<number, Employee>,
  +counter: number
};

export type Action<T> = {
  +type: string,
  +payload: T
};

export type GetState = () => State;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
