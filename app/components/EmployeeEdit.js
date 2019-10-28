// @flow
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Employee } from '../dtos/Employee';

type Props = {
  save: Employee => void,
  detail: ?Employee,
  employees: Array<Employee>
};

export default class EmployeeEdit extends Component<Props> {
  props: Props;

  render() {
    let { detail } = this.props;
    const { save, employees } = this.props;

    if (!detail) {
      detail = {
        id: Math.max(employees.map(e => e.id)) + 1
      };
    }

    return (
      <div id="employee-edit">
        <Form
          onSubmit={save}
          initialValues={detail}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Id</label>
                <Field
                  name="id"
                  component="input"
                  type="text"
                  placeholder="Id"
                  disabled
                />
              </div>
              <div>
                <label>First Name</label>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label>Last Name</label>
                <Field
                  name="surname"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label>Notes</label>
                <Field name="notes" component="textarea" placeholder="Notes" />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
