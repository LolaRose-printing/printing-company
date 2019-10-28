// @flow

import {
  DELETE_WORK_TYPE,
  SAVE_WORK_TYPE
} from '../actions/workTypeListActions';
import type { Action } from './types';
import type { WorkType } from '../dtos/WorkType';

export default function workTypes(
  state: Map<number, WorkType> = new Map(),
  action: Action
) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));

  switch (action.type) {
    case SAVE_WORK_TYPE:
      return saveWorkType(copyMap, action.payload);
    case DELETE_WORK_TYPE:
      return deleteWorkType(copyMap, action.payload);
    default:
      return state;
  }
}

function saveWorkType(copyMap: Map<number, WorkType>, workType: WorkType) {
  copyMap.set(workType.id, workType);
  return copyMap;
}

function deleteWorkType(copyMap: Map<number, WorkType>, workTypeId: number) {
  copyMap.delete(workTypeId);
  return copyMap;
}
