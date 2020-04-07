import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesReportList from '../../components/reports/employees/all/EmployeesReportList';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      orders: [],
      workTypes: [],
      employees: [],
      works: [],
    };
  }

  const { employeesIds, startDate, endDate } = JSON.parse(ownProps.match.params.filter);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const affectedOrders = getAffectedOrders(state.orders, start, end);
  const affectedEmployees = getAffectedEmployees(state.employees, employeesIds);

  const employeeData = new Map();
  affectedEmployees.forEach(employee => {
    const works = affectedOrders.map(order => {
      return {
        orderId: order.id,
        works: order.works.filter(work => work.employeeId === employee.id),
      };
    });

    employeeData.set(employee.id, works);
  });


  return {
    startDate: start,
    endDate: end,
    orders: state.orders,
    workTypes: state.workTypes,
    employees: affectedEmployees,
    employeeData: employeeData,
  };
}

const getAffectedOrders = (orders, startDate, endDate) =>
  [...orders.values()].filter(v => {
    const date = new Date(v.date);
    return startDate <= date && date <= endDate;
  });


const getAffectedEmployees = (employees, employeesIds) =>
  [...employees.values()].filter((x) => employeesIds.includes(x.id));

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesReportList);
