import { createAction } from 'redux-actions';

export default {
  saveOrder: createAction('SAVE_ORDER'),
  deleteOrder: createAction('DELETE_ORDER'),
};
