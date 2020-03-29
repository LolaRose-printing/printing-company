import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Save from '../components/Save';
import { convertState } from '../utils/SaveState';
import { changeState } from '../actions/loadStateAction';

function mapStateToProps(state) {
  return convertState(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      changeState
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save);
