// @flow

export const ADD_NEW = 'ADD_NEW';
export const VIEW_DETAILS = 'VIEW_DETAILS';

export function addNew() {
  return {
    type: ADD_NEW
  };
}

export function viewDetails(id: number) {
  console.log('viewDetails called', id);
  return {
    type: VIEW_DETAILS
  };
}
