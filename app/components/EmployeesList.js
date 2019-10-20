// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '../dtos/Employee';
import styles from './Counter.css';
import routes from '../constants/routes';

type Props = {
  addNew: () => void,
  viewDetails: number => void,
  employeesList: Array<Employee>
};

export default class EmployeesList extends Component<Props> {
  props: Props;

  render() {
    const { addNew, viewDetails, employeesList } = this.props;
    return (
      <div id="employees-div">
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

        <input type="text" />
        <ul id="employees-list">
          {employeesList.map(e => (
            <li key={e.id}>
              {e.name} {e.surname}
              <button type="button" onClick={() => viewDetails(e.id)}>
                Detail
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={addNew}>
          Add new
        </button>
      </div>
    );
  }
}
