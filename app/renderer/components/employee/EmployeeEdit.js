import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import SubmitButton from '../tools/SubmitButton';
import ResetButton from '../tools/ResetButton';

export default class EmployeeEdit extends Component {
  static propTypes = {
    detail: PropTypes.any,
    saveEmployee: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func,
  };

  render() {
    const { saveEmployee, detail } = this.props;

    return (
      <div id="employee-edit">
        <Form
          onSubmit={saveEmployee}
          initialValues={detail}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div style={detail ? {} : { display: 'none' }}>
                <label>Číslo Zaměstnance</label>
                <Field name="id" component="input" type="text" placeholder="Číslo Zaměstnance" disabled />
              </div>
              <div>
                <label>Jméno</label>
                <Field name="name" component="input" type="text" placeholder="Jméno" />
              </div>
              <div>
                <label>Příjmení</label>
                <Field name="surname" component="input" type="text" placeholder="Příjmení" />
              </div>
              <div>
                <label>Datum narození</label>
                <Field name="socialSecurityNumber" component="input" type="text" placeholder="Datum narození" />
              </div>
              <div>
                <label>IČO</label>
                <Field name="identificationNumber" component="input" type="text" placeholder="IČO" />
              </div>
              <div>
                <label>Telefon</label>
                <Field name="phone" component="input" type="text" placeholder="Telefon" />
              </div>
              <div>
                <label>Adresa</label>
                <Field name="address" component="textarea" placeholder="Adresa" />
              </div>
              <div>
                <label>Poznámky</label>
                <Field name="notes" component="textarea" placeholder="Poznámky" />
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
