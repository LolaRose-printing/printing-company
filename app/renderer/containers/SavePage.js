import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Save from '../components/tools/Save';
import { convertState } from '../utils/stateSaving';
import actions from '../actions/loadState';

function mapStateToProps(state) {
  return convertState(state);
}

function mapDispatchToProps(dispatch) {
  const act = bindActionCreators(actions, dispatch);
  return {
    changeState: (data) => act.changeState(data),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Save);
