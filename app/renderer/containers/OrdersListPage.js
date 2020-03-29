import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OrdersList from '../components/orders/OrdersList';

function mapStateToProps(state) {
  return {
    orders: [...state.orders.values()],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersList);
