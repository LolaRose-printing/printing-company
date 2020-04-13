import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import SubmitButton from '../tools/SubmitButton';
import ResetButton from '../tools/ResetButton';

export default class ClientEdit extends Component {
  static propTypes = {
    client: PropTypes.any,
    save: PropTypes.func.isRequired,
    delete: PropTypes.func,
  };

  render() {
    const { client, save } = this.props;
    return (
      <div id="employee-edit">
        <Form
          onSubmit={save}
          initialValues={client}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div style={client ? {} : { display: 'none' }}>
                <label>Číslo zákazníka</label>
                <Field name="id" component="input" type="text" placeholder="Číslo zákazníka" disabled />
              </div>
              <div>
                <label>Jméno</label>
                <Field name="name" component="input" type="text" placeholder="Jméno" />
              </div>
              <div>
                <label>Telefon</label>
                <Field name="phone" component="input" type="text" placeholder="Telefon" />
              </div>
              <div>
                <label>E-Mail</label>
                <Field name="email" component="input" type="text" placeholder="E-Mail" />
              </div>
              <div>
                <label>Adresa</label>
                <Field name="address" component="textarea" type="text" placeholder="Adresa" />
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
