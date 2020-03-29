import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientReportSelection from '../components/reports/clients/ClientReportSelection';

function mapStateToProps(state) {
  const clients = [...state.clients.values()];

  const clientsOrders = new Map();
  clients.forEach(x => {
    clientsOrders[x.id] = [];
  });

  [...state.orders.values()].forEach(x => {
    clientsOrders[x.clientId].push(x);
  });

  return {
    clients,
    orders: clientsOrders,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientReportSelection);
