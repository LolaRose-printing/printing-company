// @flow

import {
  DELETE_WORK_TYPE,
  SAVE_WORK_TYPE
} from '../actions/workTypeListActions';
import { saveToMap } from './common';

import type { Action } from './types';
import type { WorkType } from '../dtos/WorkType';
import { LOAD_STATE } from '../actions/loadStateAction';

export default function workTypes(
  state: Map<number, WorkType> = new Map(),
  action: Action
) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));

  switch (action.type) {
    case SAVE_WORK_TYPE:
      return saveToMap(copyMap, action.payload);
    case DELETE_WORK_TYPE:
      return deleteWorkType(copyMap, action.payload);
    case LOAD_STATE:
      return action.payload.workTypes;
    default:
      return state;
  }
}

function deleteWorkType(copyMap: Map<number, WorkType>, workTypeId: number) {
  copyMap.delete(workTypeId);
  return copyMap;
}
