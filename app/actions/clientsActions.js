// @flow

import type { Client } from '../dtos/Client';

export const SAVE_CLIENT = 'SAVE_CLIENT';
export const DELETE_CLIENT = 'DELETE_CLIENT';

export function saveClient(client: Client) {
  return {
    type: SAVE_CLIENT,
    payload: client
  };
}

export function deleteClient(clientId: number) {
  return {
    type: DELETE_CLIENT,
    payload: clientId
  };
}
