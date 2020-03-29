import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesReportSelection from '../components/reports/employees/EmployeesReportSelection';

function mapStateToProps(state) {
  return {
    employees: [...state.employees.values()],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesReportSelection);
