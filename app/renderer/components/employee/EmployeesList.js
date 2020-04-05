import React, { Component } from 'react';
import Modal from 'react-modal';
import EmployeeEdit from './EmployeeEdit';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

import 'materialize-css';
import { Button, Collapsible, CollapsibleItem, Icon, TextInput } from 'react-materialize';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#app');

export default class EmployeesList extends Component {
  static propTypes = {
    employeesList: PropTypes.array.isRequired,
    saveEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
  };

  state = {
    search: [],
    modalIsOpen: false,
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

  openModal = () => {
    this.setState((state) => ({
      ...state,
      modalIsOpen: true,
    }));
  };

  closeModal = () => {
    this.setState((state) => ({
      ...state,
      modalIsOpen: false,
    }));
  };

  modalButton = () => (
    <Button
      className="red" floating
      icon={<Icon>add</Icon>}
      small
      onClick={this.openModal}
      node="button"
      waves="light"
    />
  );

  render() {
    const { saveEmployee, deleteEmployee, employeesList } = this.props;
    const { search, modalIsOpen } = this.state;

    const displayedEmployees = this.selectEmployees(search, employeesList);
    return (
      <div id="employees-div">
        <BackButton/>

        <TextInput
          icon={<Icon>search</Icon>}
          id="employees-search"
          label="Search"
          onChange={(e) => {
            const searchValues = e.target.value.split(' ');
            this.setState((state) => ({
              ...state,
              search: searchValues,
            }));
          }}
        />
        <Button
          className="red"
          floating
          icon={<Icon>add</Icon>}
          small
          node="button"
          waves="light"
          onClick={this.openModal}
        />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel="Modal">

          <EmployeeEdit
            saveEmployee={(e) => {
              saveEmployee(e);
              this.closeModal();
            }}
            deleteEmployee={undefined}
            detail={undefined}
          />
        </Modal>

        <Collapsible id="employees-list" accordion={false}>
          {displayedEmployees.map((e) => (
            <CollapsibleItem
              key={e.id}
              expanded={false}
              header={`${e.name} ${e.surname}`}
              node="div"
            >
              <EmployeeEdit
                saveEmployee={saveEmployee}
                detail={e}
                deleteEmployee={deleteEmployee}
              />

            </CollapsibleItem>
          ))}
        </Collapsible>
      </div>
    );
  }
};
