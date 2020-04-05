import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Button, Icon, Select } from 'react-materialize';

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

  render() {
    const { employees, motives, workTypes, work, onChange, deleteAssignment } = this.props;

    return (
      <Form
        onSubmit={onChange}
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
              <Button
                type="submit"
                disabled={submitting || pristine}
                className="green work-assignment-button"
                floating
                icon={<Icon>check</Icon>}
                small
                node="button"
                waves="light"
              />
              <Button
                type="submit"
                disabled={submitting || pristine}
                className="orange work-assignment-button"
                floating
                icon={<Icon>repeat</Icon>}
                small
                node="button"
                waves="light"
                onClick={form.reset}
              />
              <Button
                className="red work-assignment-button"
                floating
                icon={<Icon>delete</Icon>}
                small
                node="button"
                waves="light"
                onClick={deleteAssignment}
              />
            </div>
          </form>
        )}
      />
    );
  }
}
