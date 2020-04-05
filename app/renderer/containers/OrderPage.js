import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions/orders';
import Order from '../components/orders/Order';

function mapStateToProps(state, ownProps) {
  const orderId = JSON.parse(ownProps.match.params.id);
  const order = state.orders.get(orderId);
  return {
    order,
    employees: state.employees,
    workTypes: state.workTypes,
    motives: state.motives,
    clients: [...state.clients.values()],
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
)(Order);
