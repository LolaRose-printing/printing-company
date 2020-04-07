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
                <label>Id</label>
                <Field name="id" component="input" type="text" placeholder="Id" disabled/>
              </div>
              <div>
                <label>Name</label>
                <Field name="name" component="input" type="text" placeholder="Name"/>
              </div>
              <div>
                <label>Address</label>
                <Field name="address" component="textarea" type="text" placeholder="Address"/>
              </div>

              <div className="employee-edit-buttons">
                <SubmitButton disabled={submitting || pristine}/>
                <ResetButton disabled={submitting || pristine} onClick={form.reset}/>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
