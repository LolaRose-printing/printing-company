import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesYearReportList from '../../components/reports/employees/monthly/EmployeesYearReportList';
import { computedWageToDisplayed, computeWage } from '../../utils/wageComputation';
import midnightDay from '../../utils/Midnight';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      employees: [],
      employeeMonthlyWages: {},
      employeeWagesSums: {},
    };
  }

  const { employeesIds, startDate, endDate } = JSON.parse(ownProps.match.params.filter);

  const start = midnightDay(startDate);
  const end = midnightDay(endDate);

  const orders = Object.values(state.orders).filter((o) => {
    const date = midnightDay(o.date);
    return start <= date && date <= end;
  });

  const employeeMonthlyWages = prepareMap(start, end, employeesIds);
  const employeeWagesSums = fillWorkDataAndGetSum(orders, employeesIds, state.workTypes, employeeMonthlyWages);

  Object.keys(employeeMonthlyWages).forEach((employee) => {
    const monthData = employeeMonthlyWages[employee];
    employeeMonthlyWages[employee] = Object.values(monthData);
  });

  return {
    startDate: start,
    endDate: end,
    employees: Object.values(state.employees).filter((x) => employeesIds.includes(x.id)),
    employeeMonthlyWages,
    employeeWagesSums,
  };
}

function prepareMap(start, end, employeesIds) {
  const employeeMonthlyWages = {};
  employeesIds.forEach((x) => {
    const monthlyMap = {};
    let month = start.getMonth() + 1;
    let year = start.getFullYear();

    while (year < end.getFullYear() || (year === end.getFullYear() && month <= end.getMonth() + 1)) {
      monthlyMap[`${year}-${month}`] = {
        month: `${year}-${('0' + month).slice(-2)}`,
        computedWage: 0,
        wageToDisplay: 0,
      };

      if (++month > 12) {
        month = 1;
        year++;
      }
    }
    employeeMonthlyWages[x] = monthlyMap;
  });
  return employeeMonthlyWages;
}

function fillWorkDataAndGetSum(orders, employeesIds, workTypes, employeeMonthlyWages) {
  orders.forEach((order) => {
    const date = midnightDay(order.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    order.works
      .filter((work) => employeesIds.includes(work.employeeId))
      .forEach((work) => {
        const obj = employeeMonthlyWages[work.employeeId][key];
        obj.computedWage += computeWage(work.amount, workTypes[work.workTypeId].employeeWage);
      });
  });

  const employeeWageSums = {};
  // take current values in thousands and round them
  Object.keys(employeeMonthlyWages).forEach(employee => {
    employeeWageSums[employee] = 0;
    Object.keys(employeeMonthlyWages[employee]).forEach(key => {
      const wage = employeeMonthlyWages[employee][key].computedWage;
      employeeWageSums[employee] += wage;
      employeeMonthlyWages[employee][key].wageToDisplay = computedWageToDisplayed(wage);
    });

    employeeWageSums[employee] = computedWageToDisplayed(employeeWageSums[employee]);
  });
  return employeeWageSums;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesYearReportList);
