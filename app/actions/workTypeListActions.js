// @flow

import type { WorkType } from '../dtos/WorkType';

export const SAVE_WORK_TYPE = 'SAVE_WORK_TYPE';
export const DELETE_WORK_TYPE = 'DELETE_WORK_TYPE';

export function saveWorkType(work: WorkType) {
  return {
    type: SAVE_WORK_TYPE,
    payload: work
  };
}

export function deleteWorkType(work: WorkType) {
  return {
    type: DELETE_WORK_TYPE,
    payload: work
  };
}
