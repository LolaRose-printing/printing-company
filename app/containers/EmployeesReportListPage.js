import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesReportList from '../components/reports/employees/EmployeesReportList';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      orders: [],
      workTypes: [],
      employees: [],
      works: []
    };
  }

  const { employeesIds, startDate, endDate } = JSON.parse(
    ownProps.match.params.filter
  );

  const start = new Date(startDate);
  const end = new Date(endDate);

  const orders = affectedOrders(state.orders, start, end);

  return {
    startDate: start,
    endDate: end,
    orders,
    workTypes: state.workTypes,
    employees: affectedEmployees(state.employees, employeesIds),
    works: employeesWorks(orders, employeesIds)
  };
}

// noinspection JSUnusedLocalSymbols
const affectedOrders = (orders, startDate, endDate) =>
  new Map(
    // eslint-disable-next-line no-unused-vars
    [...orders].filter(([k, v]) => {
      const date = new Date(v.date);
      return startDate <= date && date <= endDate;
    })
  );

const employeesWorks = (filteredOrders, employeesIds) => {
  const employeeReportOrder = new Map();
  employeesIds.forEach(x => {
    employeeReportOrder[x] = [];
  });

  [...filteredOrders.values()]
    .flatMap(x => x.works)
    .filter(x => employeesIds.includes(x.employeeId))
    .forEach(x => {
      employeeReportOrder[x.employeeId].push(x);
    });
  return employeeReportOrder;
};

// noinspection JSUnusedLocalSymbols
const affectedEmployees = (employees, employeesIds) =>
  [...employees.values()].filter(x => employeesIds.includes(x.id));

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesReportList);
