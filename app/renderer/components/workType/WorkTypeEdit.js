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
                <label>Číslo práce</label>
                <Field name="id" component="input" type="text" placeholder="Číslo práce" disabled />
              </div>
              <div>
                <label>Jméno práce</label>
                <Field name="name" component="input" type="text" placeholder="Jméno práce" />
              </div>
              <div>
                <label>Mzda zaměstnance za 1000</label>
                <Field
                  name="employeeWage"
                  component="input"
                  type="text"
                  placeholder="Mzda zaměstnance za 1000"
                />
              </div>
              <div>
                <label>Cena pro zákazníka za 1000</label>
                <Field name="priceForCustomer" component="input" placeholder="Cena pro zákazníka za 1000" />
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
