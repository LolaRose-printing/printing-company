import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions/orders';
import OrdersList from '../components/orders/OrdersList';

function mapStateToProps(state) {
  return {
    orders: Object.values(state.orders),
    clients: Object.values(state.clients),
  };
}

function mapDispatchToProps(dispatch) {
  const act = bindActionCreators(actions, dispatch);
  return {
    save: (data) => act.saveOrder(data),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersList);
