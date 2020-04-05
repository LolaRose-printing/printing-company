import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Button, Icon } from 'react-materialize';

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
                <label>Id</label>
                <Field name="id" component="input" type="text" placeholder="Id" disabled/>
              </div>
              <div>
                <label>First Name</label>
                <Field name="name" component="input" type="text" placeholder="First Name"/>
              </div>
              <div>
                <label>Last Name</label>
                <Field name="surname" component="input" type="text" placeholder="Last Name"/>
              </div>
              <div>
                <label>Notes</label>
                <Field name="notes" component="textarea" placeholder="Notes"/>
              </div>

              <div className="buttons">
                <Button
                  className="save-cancel-button"
                  node="button"
                  type="submit"
                  waves="light"
                  small={true}
                  disabled={submitting || pristine}
                  icon={<Icon>send</Icon>}
                >

                </Button>

                <Button
                  className="save-cancel-button"
                  node="button"
                  waves="light"
                  small={true}
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  icon={<Icon>cancel</Icon>}
                >

                </Button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
