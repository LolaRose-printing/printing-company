import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesReportList from '../../components/reports/employees/all/EmployeesReportList';
import { computedWageToDisplayed, wageFunction } from '../../utils/wageComputation';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      orders: [],
      workTypes: [],
      employees: [],
      employeeData: {},
      employeeWagesSums: {},
    };
  }

  const { employeesIds, startDate, endDate } = JSON.parse(ownProps.match.params.filter);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const affectedOrders = getAffectedOrders(state.orders, start, end);
  const affectedEmployees = getAffectedEmployees(state.employees, employeesIds);

  const employeeData = {};
  affectedEmployees.forEach((employee) => {
    employeeData[employee.id] = affectedOrders.map((order) => {
      const works = order.works.filter((work) => work.employeeId === employee.id);
      return {
        orderId: order.id,
        works: works.map((work) => {
          const wage = wageFunction(work.amount, state.workTypes[work.workTypeId].employeeWage);
          return {
            ...work,
            wageComputed: wage.computed,
            wageToDisplay: wage.displayed,
          };
        }),
      };
    });
  });

  const employeeWagesSums = {};
  Object.keys(employeeData).forEach(employeeId => {
    const computedWages = employeeData[employeeId]
      .flatMap((x) => x.works)
      .map((work) => work.wageComputed)
      .reduce((a, b) => a + b, 0);

    employeeWagesSums[employeeId] = computedWageToDisplayed(computedWages);
  });

  return {
    startDate: start,
    endDate: end,
    orders: state.orders,
    workTypes: state.workTypes,
    employees: affectedEmployees,
    employeeData: employeeData,
    employeeWagesSums,
  };
}

const getAffectedOrders = (orders, startDate, endDate) =>
  Object.values(orders).filter((v) => {
    const date = new Date(v.date);
    return startDate <= date && date <= endDate;
  });

const getAffectedEmployees = (employees, employeesIds) =>
  Object.values(employees).filter((x) => employeesIds.includes(x.id));

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesReportList);
