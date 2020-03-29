import { createAction } from 'redux-actions';

export default {
  saveClient: createAction('SAVE_CLIENT'),
  deleteClient: createAction('DELETE_CLIENT'),
};
