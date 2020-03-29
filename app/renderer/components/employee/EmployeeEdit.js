import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

export default class EmployeeEdit extends Component {
  static propTypes = {
    detail: PropTypes.any,
    saveEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func,
  };

  render() {
    const { saveEmployee, deleteEmployee, detail } = this.props;

    return (
      <div id="employee-edit">
        <Form
          onSubmit={saveEmployee}
          initialValues={detail}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div style={detail ? {} : { display: 'none' }}>
                <label>Id</label>
                <Field name="id" component="input" type="text" placeholder="Id" disabled />
              </div>
              <div>
                <label>First Name</label>
                <Field name="name" component="input" type="text" placeholder="First Name" />
              </div>
              <div>
                <label>Last Name</label>
                <Field name="surname" component="input" type="text" placeholder="Last Name" />
              </div>
              <div>
                <label>Notes</label>
                <Field name="notes" component="textarea" placeholder="Notes" />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                  Reset
                </button>
                {/* TODO add prompt */}
                <button
                  type="button"
                  onClick={() => deleteEmployee(detail.id)}
                  style={detail ? {} : { display: 'none' }}>
                  Delete
                </button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
