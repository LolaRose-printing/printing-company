import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as EmployeeListActions from '../actions/EmployeeListActions';

import EmployeesList from '../components/EmployeesList';

function mapStateToProps(state) {
  console.log('Mam state to Props.');
  console.log(state);
  console.log('Stat props execuion');
  return {
    employeesList: [...state.employees.values()]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(EmployeeListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesList);
