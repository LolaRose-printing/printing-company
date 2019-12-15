import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/orderListActions';
import OrdersList from '../components/orders/OrdersList';

function mapStateToProps(state) {
  return {
    orders: [...state.orders.values()],
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
)(OrdersList);
