// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Employee } from '../dtos/Employee';
import routes from '../constants/routes';
import EmployeeDetail from './EmployeeDetail';
import detailStyles from './EmployeeDetail.css';
import EmployeeEdit from './EmployeeEdit';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

type Props = {
  saveEmployee: Employee => void,
  deleteEmployee: Employee => void,
  employeesList: Array<Employee>
};

export default class EmployeesList extends Component<Props> {
  props: Props;

  state = {
    search: [],
    modalIsOpen: false
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

  openModal = () => {
    this.setState(state => ({
      ...state,
      modalIsOpen: true
    }));
  };

  closeModal = () => {
    this.setState(state => ({
      ...state,
      modalIsOpen: false
    }));
  };

  render() {
    const { saveEmployee, deleteEmployee, employeesList } = this.props;
    const { search, modalIsOpen } = this.state;

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
          onChange={e => {
            const searchValues = e.target.value.split(' ');
            this.setState(state => ({
              ...state,
              search: searchValues
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
          contentLabel="Example Modal"
        >
          <div className={detailStyles.detailBox}>
            <EmployeeEdit
              save={e => {
                saveEmployee(e);
                this.closeModal();
              }}
              deleteRecord={undefined}
              detail={undefined}
            />
          </div>
        </Modal>

        <ul id="employees-list">
          {displayedEmployees.map(e => (
            <li key={e.id}>
              <EmployeeDetail
                detail={e}
                save={saveEmployee}
                deleteRecord={deleteEmployee}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
