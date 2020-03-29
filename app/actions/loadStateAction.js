export const LOAD_STATE = 'LOAD_STATE';

export function changeState(state) {
  return {
    type: LOAD_STATE,
    payload: state
  };
}
