import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions/orders';
import Order from '../components/orders/Order';

function mapStateToProps(state, ownProps) {
  const orderId = JSON.parse(ownProps.match.params.id);
  const order = state.orders[orderId];

  let motives = Object.values(state.orders).flatMap((o) => o.works.map((w) => w.motive));
  motives = new Set(motives);

  return {
    order,
    employees: state.employees,
    workTypes: state.workTypes,
    motives,
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
)(Order);
