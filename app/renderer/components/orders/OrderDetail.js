import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import DatePickerWrapper from '../tools/DatePickerWrapper';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Select } from 'react-materialize';

export default class OrderDetail extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    order: PropTypes.any.isRequired,
    clients: PropTypes.array.isRequired,
  };


  render() {
    const { save, order, clients } = this.props;
    return (
      <Form
        onSubmit={save}
        initialValues={order}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form
            id="order-detail-form"
            onSubmit={handleSubmit}
          >
            <div>
              <label>Name</label>
              <Field name="name" component="input" type="text" placeholder="Order Name"/>
            </div>

            <div>
              <Field name="clientId">
                {({ input }) => (
                  <Select
                    value={`${input.value}`}
                    label="Client"
                    onChange={(d) => {
                      input.onChange(d);
                    }}
                  >
                    {clients.map((x) => (
                      <option key={x.id} value={x.id} name={x.name}>
                        {x.name}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
            </div>

            <div>
              <label>Notes</label>
              <Field name="notes" component="textarea" placeholder="Notes"/>
            </div>

            <div>
              <Field name="date">
                {({ input }) => (
                  <DatePickerWrapper
                    initDate={input.value}
                    onChange={(d) => {
                      input.onChange(d);
                    }}
                  />
                )}
              </Field>
            </div>

            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
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
