import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions/orders';
import OrderDetail from '../components/orders/OrderDetail';

function mapStateToProps(state, ownProps) {
  const orderId = JSON.parse(ownProps.match.params.id);
  const order = state.orders.get(orderId);
  return {
    order,
    employees: state.employees,
    workTypes: state.workTypes,
    clients: state.clients,
    motives: state.motives,
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
)(OrderDetail);
