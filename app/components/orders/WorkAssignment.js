// @flow

import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import type { Work } from '../../dtos/Order';
import type { Employee } from '../../dtos/Employee';
import type { WorkType } from '../../dtos/WorkType';

type Props = {
  employees: Map<number, Employee>,
  workTypes: Map<number, WorkType>,
  work: Work,
  onChange: Work => void
};

export default class WorkAssignment extends Component<Props> {
  props: Props;

  validateForm = values => {
    const errors = {};
    if (values.employeeId === -1) {
      errors.employeeId = 'Must be selected';
    }

    if (values.workTypeId === -1) {
      errors.workTypeId = 'Must be selected';
    }

    if (!parseInt(values.amount, 10)) {
      errors.amount = 'Must be set';
    }

    return errors;
  };

  render() {
    const { employees, workTypes, work, onChange } = this.props;

    return (
      <Form
        onSubmit={onChange}
        initialValues={work}
        validate={this.validateForm}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Employee</label>
              <Field
                name="employeeId"
                component="select"
                placeholder="Employee"
              >
                {[...employees.values()].map(x => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label>Work Type</label>
              <Field
                name="workTypeId"
                component="select"
                placeholder="Work Type"
              >
                {[...workTypes.values()].map(x => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label>Amount</label>
              <Field name="amount" component="textarea" placeholder="Amount" />
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
    );
  }
}
