// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { Employee } from '../dtos/Employee';
import routes from '../constants/routes';
import EmployeeDetail from './EmployeeDetail';
import detailStyles from './EmployeeDetail.css';
import EmployeeEdit from './EmployeeEdit';

type Props = {
  saveEmployee: Employee => void,
  employeesList: Array<Employee>
};

export default class EmployeesList extends Component<Props> {
  props: Props;

  state = {
    search: []
  };

  selectEmployees = (search, employeesList) => {
    let displayedEmployees;
    if (search.length) {
      const searchPattern = new RegExp(
        search.map(term => `(?=.*${term})`).join(''),
        'i'
      );

      displayedEmployees = employeesList.filter(
        e => e.name.match(searchPattern) || e.surname.match(searchPattern)
      );
    } else {
      displayedEmployees = employeesList;
    }
    return displayedEmployees;
  };

  render() {
    const { saveEmployee, employeesList } = this.props;
    const { search } = this.state;

    const displayedEmployees = this.selectEmployees(search, employeesList);
    return (
      <div id="employees-div">
        <div data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

        <input
          id="employees-search"
          type="text"
          onChange={e => this.setState({ search: e.target.value.split(' ') })}
        />

        <Collapsible trigger="Add new">
          <div className={detailStyles.detailBox}>
            <EmployeeEdit
              save={saveEmployee}
              detail={undefined}
              newId={Math.max(...employeesList.map(e => e.id))}
            />
          </div>
        </Collapsible>

        <ul id="employees-list">
          {displayedEmployees.map(e => (
            <li key={e.id}>
              <EmployeeDetail detail={e} save={saveEmployee} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
