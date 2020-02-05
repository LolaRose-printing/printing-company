// @flow

export type Work = {
  recordId: number,
  employeeId: number,
  workId: number,
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
