import { copyMap, deleteFromMap, saveToMap } from '../utils/mapUtils';
import stateActions from '../actions/loadState';
import { handleActions } from 'redux-actions';
import actions from '../actions/employees';

export default handleActions(
  {
    [actions.saveEmployee]: (state, action) => {
      return saveToMap(copyMap(state), action.payload);
    },
    [actions.deleteEmployee]: (state, action) => {
      return deleteFromMap(copyMap(state), action.payload);
    },
    [stateActions.changeState]: (state, action) => {
      return action.payload.employees;
    },
  },
  {},
);
