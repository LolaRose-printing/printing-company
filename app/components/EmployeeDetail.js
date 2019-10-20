import React, { Component } from 'react';
import Employee from '../dtos/Employee';

type Props = {
  // save: () => void,
  detail: Employee
};

export default class EmployeeDetail extends Component<Props> {
  props: Props;

  render() {
    const { detail } = this.props;
    return (
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone</th>
        </tr>
        <tr>
          <td>{detail.name}</td>
          <td>{detail.surname}</td>
          <td>{detail.phone}</td>
        </tr>
      </table>
    );
  }
}
