export const geOrderPrice = (order, workTypes) =>
  order.works
    .map(x => workTypes.get(x.workTypeId).priceForCustomer * x.amount)
    .reduce((a, b) => a + b, 0);

export const getPriceForMultipleOrders = (orders, workTypes) =>
  orders.map(x => geOrderPrice(x, workTypes)).reduce((a, b) => a + b, 0);
