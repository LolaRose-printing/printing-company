import type { Action } from './types';
import { saveToMap, deleteFromMap } from './common';
import { DELETE_CLIENT, SAVE_CLIENT } from '../actions/clientsActions';
import type { Client } from '../dtos/Client';
import { LOAD_STATE } from '../actions/loadStateAction';

export default function clients(
  state: Map<number, Client> = new Map(),
  action: Action
) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));

  switch (action.type) {
    case SAVE_CLIENT:
      return saveToMap(copyMap, action.payload);
    case DELETE_CLIENT:
      return deleteFromMap(copyMap, action.payload);
    case LOAD_STATE:
      return action.payload.clients;
    default:
      return state;
  }
}
