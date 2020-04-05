import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmployeesYearReportList from '../../components/reports/employees/monthly/EmployeesYearReportList';

function mapStateToProps(state, ownProps) {
  if (!ownProps.match.params.filter) {
    console.log('Filter is not defined, this page should not be displayed!');
    return {
      startDate: undefined,
      endDate: undefined,
      employees: [],
      employeeMonthlyWages: new Map(),
    };
  }

  const { employeesIds, startDate, endDate } = JSON.parse(ownProps.match.params.filter);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const orders = [...state.orders.values()].filter((o) => {
    const date = new Date(o.date);
    return (
      start <= date && date <= end
    );
  });

  const employeeMonthlyWages = prepareMap(start, end, employeesIds);
  fillWorkData(orders, employeesIds, state.workTypes, employeeMonthlyWages);

  [...employeeMonthlyWages.keys()].forEach(employee => {
    const monthData = employeeMonthlyWages.get(employee);
    employeeMonthlyWages.set(employee, [...monthData.values()]);
  });

  return {
    startDate: start,
    endDate: end,
    employees: [...state.employees.values()].filter(x => employeesIds.includes(x.id)),
    employeeMonthlyWages,
  };
}

function prepareMap(start, end, employeesIds) {
  const employeeMonthlyWages = new Map();
  employeesIds.forEach(x => {
    const monthlyMap = new Map();
    let month = start.getMonth();
    let year = start.getFullYear();

    while (year < end.getFullYear() || (year === end.getFullYear() && month <= end.getMonth())) {
      monthlyMap.set(`${year}-${month}`, { month: `${year}-${month}`, wage: 0 });

      if (++month > 12) {
        month = 1;
        year++;
      }
    }
    employeeMonthlyWages.set(x, monthlyMap);
  });
  return employeeMonthlyWages;
}

function fillWorkData(orders, employeesIds, workTypes, employeeMonthlyWages) {
  orders.forEach(order => {
    const date = new Date(order.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    order.works.forEach(work => {
      if (!employeesIds.includes(work.employeeId)) return;

      const wage = workTypes.get(work.workTypeId).employeeWage;
      employeeMonthlyWages.get(work.employeeId).get(key).wage += work.amount * wage;
    });
  });


}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeesYearReportList);
