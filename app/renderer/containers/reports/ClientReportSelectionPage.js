import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClientReportSelection from '../../components/reports/clients/ClientReportSelection';

function mapStateToProps(state) {
  const clients = Object.values(state.clients);

  const clientsOrders = {};
  clients.forEach((x) => {
    clientsOrders[x.id] = [];
  });

  Object.values(state.orders).forEach((x) => {
    clientsOrders[x.clientId].push(x);
  });

  return {
    clients,
    clientsOrders,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientReportSelection);
