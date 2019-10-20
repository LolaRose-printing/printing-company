// @flow

import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { Employee } from '../dtos/Employee';

type Props = {
  // save: () => void,
  detail: Employee
};

export default class EmployeeDetail extends Component<Props> {
  props: Props;

  render() {
    const { detail } = this.props;
    return (
      <Collapsible trigger={`${detail.name} ${detail.surname}`}>
        Here is place for detail: {detail.name} {detail.surname}`
      </Collapsible>
    );
  }
}
