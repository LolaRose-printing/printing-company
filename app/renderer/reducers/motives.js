import { copyMap, deleteFromMap, saveToMap } from '../utils/mapUtils';
import stateActions from '../actions/loadState';
import { handleActions } from 'redux-actions';
import actions from '../actions/motives';

export default handleActions(
  {
    [actions.saveMotive]: (state, action) => {
      return saveToMap(copyMap(state), action.payload);
    },
    [actions.deleteMotive]: (state, action) => {
      return deleteFromMap(copyMap(state), action.payload);
    },
    [stateActions.changeState]: (state, action) => {
      return action.payload.motives;
    },
  },
  new Map(),
);
