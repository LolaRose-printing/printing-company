import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import SubmitButton from '../tools/SubmitButton';
import ResetButton from '../tools/ResetButton';

export default class WorkTypeEdit extends Component {
  static propTypes = {
    workType: PropTypes.any,
    save: PropTypes.func.isRequired,
    delete: PropTypes.func,
  };

  render() {
    const { workType, save } = this.props;
    return (
      <div id="employee-edit">
        <Form
          onSubmit={save}
          initialValues={workType}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div style={workType ? {} : { display: 'none' }}>
                <label>Id</label>
                <Field name="id" component="input" type="text" placeholder="Id" disabled />
              </div>
              <div>
                <label>Name</label>
                <Field name="name" component="input" type="text" placeholder="Name" />
              </div>
              <div>
                <label>Employee Wage</label>
                <Field
                  name="employeeWage"
                  component="input"
                  type="text"
                  placeholder="Employee Wage"
                />
              </div>
              <div>
                <label>Price for customer</label>
                <Field name="priceForCustomer" component="input" placeholder="Price for customer" />
              </div>

              <div className="employee-edit-buttons">
                <SubmitButton disabled={submitting || pristine} />
                <ResetButton disabled={submitting || pristine} onClick={form.reset} />
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
