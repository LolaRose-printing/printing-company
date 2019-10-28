import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WorkTypeListActions from '../actions/workTypeListActions';
import WorkTypeList from '../components/workType/WorkTypeList';

function mapStateToProps(state) {
  return {
    workTypeList: [...state.workTypes.values()]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WorkTypeListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkTypeList);
