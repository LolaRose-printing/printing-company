import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions/employees';

import EmployeesList from '../components/employee/EmployeesList';

function mapStateToProps(state) {
  return {
    employeesList: Object.values(state.employees),
  };
}

function mapDispatchToProps(dispatch) {
  const act = bindActionCreators(actions, dispatch);
  return {
    saveEmployee: (data) => act.saveEmployee(data),
    deleteEmployee: (data) => act.deleteEmployee(data),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesList);
