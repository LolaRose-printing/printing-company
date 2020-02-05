import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/orderDetailActions';
import OrderDetail from '../components/orders/OrderDetail';

function mapStateToProps(state, ownProps) {
  const orderId = parseInt(ownProps.match.params.id, 10);
  const order = state.orders.get(orderId);
  return {
    order,
    employees: state.employees,
    workTypes: state.workTypes,
    clients: state.clients
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail);
