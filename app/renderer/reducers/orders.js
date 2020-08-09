import { copyMap, deleteFromMap, saveToMap } from '../utils/mapUtils';
import stateActions from '../actions/loadState';
import { handleActions } from 'redux-actions';
import actions from '../actions/orders';
import midnightDay from '../utils/Midnight';

export default handleActions(
  {
    [actions.saveOrder]: (state, action) => {
      const payload = { ...action.payload, date: midnightDay(action.payload.date) };
      return saveToMap(copyMap(state), payload);
    },
    [actions.deleteOrder]: (state, action) => {
      return deleteFromMap(copyMap(state), action.payload);
    },
    [stateActions.changeState]: (state, action) => {
      return action.payload.orders;
    },
  },
  {},
);
