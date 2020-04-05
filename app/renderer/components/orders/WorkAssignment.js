import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

export default class WorkAssignment extends Component {
  static propTypes = {
    employees: PropTypes.any.isRequired,
    workTypes: PropTypes.any.isRequired,
    motives: PropTypes.any.isRequired,
    work: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { employees, motives, workTypes, work, onChange } = this.props;

    return (
      <Form
        onSubmit={onChange}
        initialValues={work}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Employee</label>
              <Field name="employeeId" component="select" placeholder="Employee">
                {[...employees.values()].map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </Field>

            </div>

            <div>
              <label>Motive</label>
              <Field name="motiveId" component="select" placeholder="Motive">
                {[...motives.values()].map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label>Work Type</label>
              <Field name="workTypeId" component="select" placeholder="Work Type">
                {[...workTypes.values()].map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </Field>

            </div>

            <div>
              <label>Amount</label>
              <Field name="amount" component="textarea" placeholder="Amount"/>
            </div>

            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                OK
              </button>
              <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                Reset
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}
