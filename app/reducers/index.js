// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import employees from './employeeList';
import workTypes from './workTypeList';
import orders from './orderList';
import clients from './clients';

export default function createRootReducer(history: History) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    counter,
    employees,
    workTypes,
    orders,
    clients
  });
}
