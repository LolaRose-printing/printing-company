import type { Action } from './types';
import { SAVE_ORDER, DELETE_ORDER } from '../actions/orderDetailActions';
import { saveToMap, deleteFromMap } from './common';
import type { Order } from '../dtos/Order';
import { LOAD_STATE } from '../actions/loadStateAction';

export default function orders(
  state: Map<number, Order> = new Map(),
  action: Action
) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));

  switch (action.type) {
    case SAVE_ORDER:
      return saveToMap(copyMap, action.payload);
    case DELETE_ORDER:
      return deleteFromMap(copyMap, action.payload);
    case LOAD_STATE:
      return action.payload.orders;
    default:
      return state;
  }
}
