import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesYearReportList from '../../components/reports/employees/monthly/EmployeesYearReportList';
import { roundThousandsWorks } from '../../utils/rounding';

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

  const start = new Date(startDate);
  const end = new Date(endDate);

  const orders = Object.values(state.orders).filter((o) => {
    const date = new Date(o.date);
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
      monthlyMap[`${year}-${month}`] = { month: `${year}-${('0' + month).slice(-2)}`, wage: 0 };

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
    const date = new Date(order.date);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    order.works.forEach((work) => {
      if (!employeesIds.includes(work.employeeId)) return;
      employeeMonthlyWages[work.employeeId][key].wage +=
        work.amount * workTypes[work.workTypeId].employeeWage;
    });
  });

  const employeeWageSums = {};
  // take current values in thousands and round them
  Object.keys(employeeMonthlyWages).forEach(employee => {
    employeeWageSums[employee] = 0;
    Object.keys(employeeMonthlyWages[employee]).forEach(key => {
      const wage = employeeMonthlyWages[employee][key].wage;
      employeeWageSums[employee] += wage;
      employeeMonthlyWages[employee][key].wage = roundThousandsWorks(wage);
    });
    employeeWageSums[employee] = roundThousandsWorks(employeeWageSums[employee]);
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
