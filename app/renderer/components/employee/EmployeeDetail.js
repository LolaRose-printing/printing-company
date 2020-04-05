import React, { Component } from 'react';
// import Collapsible from 'react-collapsible';
import EmployeeEdit from './EmployeeEdit';
import PropTypes from 'prop-types';
import 'materialize-css';
import { CollapsibleItem } from 'react-materialize';

export default class EmployeeDetail extends Component {
  static propTypes = {
    detail: PropTypes.any.isRequired,
    saveEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
  };

  render() {
    const { detail, saveEmployee, deleteEmployee } = this.props;
    return (
      <CollapsibleItem
        key={detail.id}
        expanded={false}
        header={`${detail.name} ${detail.surname}`}
        node="div"
      >
        <div className="detailBox">
          <EmployeeEdit
            saveEmployee={saveEmployee}
            detail={detail}
            deleteEmployee={deleteEmployee}
          />
        </div>
      </CollapsibleItem>
    );
  }
}