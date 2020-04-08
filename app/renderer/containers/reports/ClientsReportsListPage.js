import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientsReportsList from '../../components/reports/clients/ClientsReportsList';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      clients: [],
      orders: [],
      workTypes: {},
    };
  }

  const { orderIds, clientIds, startDate, endDate } = JSON.parse(ownProps.match.params.filter);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const clients = Object.values(state.clients).filter((x) => clientIds.includes(x.id));

  const orders = Object.values(state.orders).filter((o) => {
    const date = new Date(o.date);
    return (
      orderIds.includes(o.id) && clientIds.includes(o.clientId) && start <= date && date <= end
    );
  });

  return {
    startDate: start,
    endDate: end,
    clients,
    orders,
    workTypes: state.workTypes,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientsReportsList);
