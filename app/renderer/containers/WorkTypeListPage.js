import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions/workTypes';
import WorkTypeList from '../components/workType/WorkTypeList';

function mapStateToProps(state) {
  return {
    workTypeList: [...state.workTypes.values()],
  };
}

function mapDispatchToProps(dispatch) {
  const act = bindActionCreators(actions, dispatch);
  return {
    saveWorkType: (data) => act.saveWorkType(data),
    deleteWorkType: (data) => act.deleteWorkType(data),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkTypeList);
