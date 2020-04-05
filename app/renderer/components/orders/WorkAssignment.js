import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Select } from 'react-materialize';

export default class WorkAssignment extends Component {
  static propTypes = {
    employees: PropTypes.any.isRequired,
    workTypes: PropTypes.any.isRequired,
    motives: PropTypes.any.isRequired,
    work: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  selector = (value, data, label) => (
    <Field name={value}>
      {({ input }) => (
        <Select
          value={`${input.value}`}
          label={label}
          onChange={(d) => {
            input.onChange(d);
          }}
        >
          {[...data.values()].map((x) => (
            <option key={x.id} value={x.id} name={x.name}>
              {x.name}
            </option>
          ))}
        </Select>
      )}
    </Field>
  );

  render() {
    const { employees, motives, workTypes, work, onChange } = this.props;

    return (
      <Form
        onSubmit={onChange}
        initialValues={work}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div className="input-field col s12">
            </div>
            <div>
              {this.selector('employeeId', employees, 'Employee')}
            </div>

            <div>
              {this.selector('motiveId', motives, 'Motive')}
            </div>


            <div>
              {this.selector('workTypeId', workTypes, 'Work Type')}
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
