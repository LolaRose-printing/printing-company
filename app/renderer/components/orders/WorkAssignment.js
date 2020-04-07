import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Select } from 'react-materialize';
import SubmitButton from '../tools/SubmitButton';
import ResetButton from '../tools/ResetButton';
import DeleteButton from '../tools/DeleteButton';

export default class WorkAssignment extends Component {
  static propTypes = {
    employees: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    work: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired,
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

  convert = (work) => {
    return {
      motiveId: parseInt(work.motiveId),
      employeeId: parseInt(work.employeeId),
      workTypeId: parseInt(work.workTypeId),
      amount: parseInt(work.amount),
    };
  };

  render() {
    const { employees, motives, workTypes, work, onChange, deleteAssignment } = this.props;

    return (
      <Form
        onSubmit={(w) => onChange(this.convert(w))}
        initialValues={work}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="work-assignment-container">
            <div className="work-assignment-cell">
              {this.selector('employeeId', employees, 'Employee')}
            </div>

            <div className="work-assignment-cell">
              {this.selector('motiveId', motives, 'Motive')}
            </div>


            <div className="work-assignment-cell">
              {this.selector('workTypeId', workTypes, 'Work Type')}
            </div>

            <div className="work-assignment-cell">
              <label>Amount</label>
              <Field name="amount" component="input" placeholder="Amount"/>
            </div>

            <div className="work-assignment-buttons">
              <SubmitButton disabled={submitting || pristine}/>

              <ResetButton disabled={submitting || pristine} onClick={form.reset}/>

              <DeleteButton onClick={deleteAssignment}/>
            </div>
          </form>
        )}
      />
    );
  }
}
