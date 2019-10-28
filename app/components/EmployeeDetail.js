// @flow

import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { Employee } from '../dtos/Employee';
import EmployeeEdit from './EmployeeEdit';
import styles from './EmployeeDetail.css';

type Props = {
  save: Employee => void,
  detail: Employee
};

export default class EmployeeDetail extends Component<Props> {
  props: Props;

  render() {
    const { detail, save } = this.props;
    return (
      <Collapsible trigger={`${detail.name} ${detail.surname}`} >
        <div className={styles.detailBox}>
          <EmployeeEdit save={save} detail={detail} newId={undefined} />
        </div>
      </Collapsible>
    );
  }
}
