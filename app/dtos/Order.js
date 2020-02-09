// @flow

export type Work = {
  recordId: number,
  orderId: number,
  employeeId: number,
  workTypeId: number,
  amount: number
};

export type Order = {
  id: number,
  name: string,
  clientId: number,
  notes: string,
  works: Array<Work>,
  date: string
};
