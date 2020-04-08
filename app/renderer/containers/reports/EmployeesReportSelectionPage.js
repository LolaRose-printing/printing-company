import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReportFilter from '../../components/reports/employees/ReportFilter';

function mapStateToProps(state) {
  return {
    employees: Object.values(state.employees),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportFilter);
