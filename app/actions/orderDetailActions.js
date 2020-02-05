// @flow

import type { Order } from '../dtos/Order';

export const SAVE_ORDER = 'SAVE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export function save(order: Order) {
  console.log('saving order');
  console.log(order);
  return {
    type: SAVE_ORDER,
    payload: order
  };
}

export function deleteOrder(orderId: number) {
  return {
    type: DELETE_ORDER,
    payload: orderId
  };
}
