import { createAction } from 'redux-actions';

export default {
  saveEmployee: createAction('SAVE_EMPLOYEE'),
  deleteEmployee: createAction('DELETE_EMPLOYEE'),
};
