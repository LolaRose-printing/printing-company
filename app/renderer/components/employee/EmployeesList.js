import React, { Component } from 'react';
import Modal from 'react-modal';
import EmployeeDetail from './EmployeeDetail';
import EmployeeEdit from './EmployeeEdit';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

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

  render() {
    const { saveEmployee, deleteEmployee, employeesList } = this.props;
    const { search, modalIsOpen } = this.state;

    const displayedEmployees = this.selectEmployees(search, employeesList);
    return (
      <div id="employees-div">
        <BackButton/>

        <input
          id="employees-search"
          type="text"
          onChange={(e) => {
            const searchValues = e.target.value.split(' ');
            this.setState((state) => ({
              ...state,
              search: searchValues,
            }));
          }}
        />

        <button onClick={this.openModal} type="button">
          Add new
        </button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel="Example Modal">
          <div className="detailBox">
            <EmployeeEdit
              saveEmployee={(e) => {
                saveEmployee(e);
                this.closeModal();
              }}
              deleteEmployee={undefined}
              detail={undefined}
            />
          </div>
        </Modal>

        <ul id="employees-list">
          {displayedEmployees.map((e) => (
            <li key={e.id}>
              <EmployeeDetail
                detail={e}
                saveEmployee={saveEmployee}
                deleteEmployee={deleteEmployee}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
