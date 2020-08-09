import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsReportsList from '../../components/reports/clients/ClientsReportsList';
import groupBy from '../../utils/groupBy';
import { computedWageToDisplayed, wageFunction } from '../../utils/wageComputation';
import midnightDay from '../../utils/Midnight';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      clients: [],
      workTypes: {},
    };
  }

  const { orderIds, clientIds, startDate, endDate } = JSON.parse(ownProps.match.params.filter);

  const start = midnightDay(startDate);
  const end = midnightDay(endDate);

  const filteredClients = Object.values(state.clients).filter((x) => clientIds.includes(x.id));
  const filteredOrders = Object.values(state.orders).filter((o) => {
    const date = midnightDay(o.date);
    return (
      orderIds.includes(o.id) && clientIds.includes(o.clientId) && start <= date && date <= end
    );
  });

  const clientsOrders = groupBy(filteredOrders, o => o.clientId);

  const clients = filteredClients.map(client => {
    const orders = mapOrders(clientsOrders[client.id], state.workTypes);
    return {
      ...client,
      orders,
      displayPrice: computedWageToDisplayed(orders.reduce((sum, o) => sum + o.computedPrice, 0)),
    };
  });

  return {
    startDate: start,
    endDate: end,
    clients,
    workTypes: state.workTypes,
  };
}

function mapOrders(clientOrders, workTypeMap) {
  return clientOrders.map(order => {
    const workRecords = mapWorkRecords(order.works, workTypeMap);
    const computedPrice = workRecords.reduce((sum, w) => sum + w.computedPrice, 0);
    return {
      name: order.name,
      date: midnightDay(order.date),
      computedPrice,
      displayPrice: computedWageToDisplayed(computedPrice),
      workRecords,
    };
  });
}

function mapWorkRecords(works, workTypeMap) {
  const groupedMotives = groupBy(works, (x) => x.motive);
  // group them first by motives
  return Object.keys(groupedMotives).flatMap((motive) => {
    const motiveWorks = groupedMotives[motive];
    const workTypesForMotive = groupBy(motiveWorks, (x) => x.workTypeId);
    // then by work types
    return Object.keys(workTypesForMotive).map((workTypeId) => {
      const amount = workTypesForMotive[workTypeId].reduce((a, b) => a + b.amount, 0);
      const price = wageFunction(amount, workTypeMap[workTypeId].priceForCustomer);
      return {
        motive,
        amount,
        workTypeId,
        displayPrice: price.displayed,
        computedPrice: price.computed,
      };
    });
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientsReportsList);
