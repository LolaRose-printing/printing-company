// @flow

import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { Employee } from '../dtos/Employee';
import EmployeeEdit from './EmployeeEdit';
import styles from './EmployeeDetail.css';

type Props = {
  save: Employee => void,
  deleteRecord: Employee => void,
  detail: Employee
};

export default class EmployeeDetail extends Component<Props> {
  props: Props;

  render() {
    const { detail, save, deleteRecord } = this.props;
    return (
      <Collapsible trigger={`${detail.name} ${detail.surname}`}>
        <div className={styles.detailBox}>
          <EmployeeEdit
            save={save}
            detail={detail}
            deleteRecord={deleteRecord}
          />
        </div>
      </Collapsible>
    );
  }
}
