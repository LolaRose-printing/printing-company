import { copyMap, deleteFromMap, saveToMap } from '../utils/mapUtils';
import stateActions from '../actions/loadState';
import { handleActions } from 'redux-actions';
import actions from '../actions/workTypes';

export default handleActions(
  {
    [actions.saveWorkType]: (state, action) => {
      return saveToMap(copyMap(state), action.payload);
    },
    [actions.deleteWorkType]: (state, action) => {
      return deleteFromMap(copyMap(state), action.payload);
    },
    [stateActions.changeState]: (state, action) => {
      return action.payload.workTypes;
    },
  },
  {},
);
