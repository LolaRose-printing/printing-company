import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions/clients';
import ClientList from '../components/client/ClientList';

function mapStateToProps(state) {
  return {
    clients: [...state.clients.values()],
  };
}

function mapDispatchToProps(dispatch) {
  const act = bindActionCreators(actions, dispatch);
  return {
    saveClient: (data) => act.saveClient(data),
    deleteClient: (data) => act.deleteClient(data),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientList);
