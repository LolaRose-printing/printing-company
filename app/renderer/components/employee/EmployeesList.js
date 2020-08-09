import React, { Component } from 'react';
import EmployeeEdit from './EmployeeEdit';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

import 'materialize-css';
import { Collapsible, CollapsibleItem, Icon, TextInput } from 'react-materialize';
import AddFromModal from '../tools/AddFromModal';

export default class EmployeesList extends Component {
  static propTypes = {
    employeesList: PropTypes.array.isRequired,
    saveEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
  };

  state = {
    search: [],
  };

  selectEmployees = (search, employeesList) => {
    let displayedEmployees;
    if (search.length) {
      const searchPattern = new RegExp(search.map((term) => `(?=.*${term})`).join(''), 'i');

      displayedEmployees = employeesList.filter(
        (e) => e.name.match(searchPattern) || e.surname.match(searchPattern),
      );
    } else {
      displayedEmployees = employeesList;
    }
    return displayedEmployees;
  };

  render() {
    const { saveEmployee, deleteEmployee, employeesList } = this.props;
    const { search } = this.state;

    const displayedEmployees = this.selectEmployees(search, employeesList);
    return (
      <div id="employees-div">
        <BackButton />

        <div id="search-bar">
          <TextInput
            icon={<Icon>search</Icon>}
            id="employees-search"
            label="Hledej"
            onChange={(e) => {
              const searchValues = e.target.value.split(' ');
              this.setState((state) => ({
                ...state,
                search: searchValues,
              }));
            }}
          />
        </div>

        <div id="employees-list">
          <Collapsible accordion={false}>
            {displayedEmployees.map((e) => (
              <CollapsibleItem
                className="employee-element"
                key={e.id}
                expanded={false}
                header={`${e.name} ${e.surname}`}
                node="div">
                <EmployeeEdit
                  saveEmployee={saveEmployee}
                  detail={e}
                  deleteEmployee={deleteEmployee}
                />
              </CollapsibleItem>
            ))}
          </Collapsible>
        </div>

        <div>
          <AddFromModal
            childrenFactory={(close) => (
              <EmployeeEdit
                className="employee-element"
                saveEmployee={(e) => {
                  saveEmployee(e);
                  close();
                }}
                deleteEmployee={undefined}
                detail={{
                  name: '',
                  surname: '',
                }}
              />
            )}
          />
        </div>
      </div>
    );
  }
}
