import { copyMap, deleteFromMap, saveToMap } from '../utils/mapUtils';
import { handleActions } from 'redux-actions';
import actions from '../actions/clients';
import stateActions from '../actions/loadState';

export default handleActions(
  {
    [actions.saveClient]: (state, action) => {
      return saveToMap(copyMap(state), action.payload);
    },
    [actions.deleteClient]: (state, action) => {
      return deleteFromMap(copyMap(state), action.payload);
    },
    [stateActions.changeState]: (state, action) => {
      return action.payload.clients;
    },
  },
  new Map(),
);
