import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import EmployeeEdit from './EmployeeEdit';
// import styles from './EmployeeDetail.css';
import PropTypes from 'prop-types';

export default class EmployeeDetail extends Component {

  static propTypes = {
    detail: PropTypes.any.isRequired,
    saveEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
  };

  render() {
    const { detail, saveEmployee, deleteEmployee } = this.props;
    return (
      <Collapsible trigger={`${detail.name} ${detail.surname}`}>
        {/*<div className={styles.detailBox}>*/}
        <div>
          <EmployeeEdit
            saveEmployee={saveEmployee}
            detail={detail}
            deleteEmployee={deleteEmployee}
          />
        </div>
      </Collapsible>
    );
  }
}
