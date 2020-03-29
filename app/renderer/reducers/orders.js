import { copyMap, deleteFromMap, saveToMap } from '../utils/mapUtils';
import stateActions from '../actions/loadState';
import { handleActions } from 'redux-actions';
import actions from '../actions/orders';

export default handleActions(
  {
    [actions.saveOrder]: (state, action) => {
      return saveToMap(copyMap(state), action.payload);
    },
    [actions.deleteOrder]: (state, action) => {
      return deleteFromMap(copyMap(state), action.payload);
    },
    [stateActions.changeState]: (state, action) => {
      return action.payload.orders;
    },
  },
  new Map(),
);
