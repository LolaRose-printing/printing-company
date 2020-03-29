import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import employees from './employees';
import workTypes from './workTypes';
import orders from './orders';
import clients from './clients';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    employees,
    workTypes,
    orders,
    clients,
  });
}
