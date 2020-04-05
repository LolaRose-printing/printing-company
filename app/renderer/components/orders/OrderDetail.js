import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import WorkAssignment from './WorkAssignment';
import DatePickerWrapper from '../tools/DatePickerWrapper';
import BackButton from '../tools/BackButton';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Select } from 'react-materialize';

export default class OrderDetail extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    order: PropTypes.any.isRequired,
    employees: PropTypes.any.isRequired,
    motives: PropTypes.any.isRequired,
    workTypes: PropTypes.any.isRequired,
    clients: PropTypes.any.isRequired,
  };

  updateWorkRecord = (save, order, updatedWork, workIdx) => {
    save({
      ...order,
      works: order.works.map((x, idx) => {
        if (idx === workIdx) {
          return { ...updatedWork };
        }
        return { ...x };
      }),
    });
  };

  addWorkRecord = (save, order, newWork) => {
    save({
      ...order,
      works: order.works.concat(newWork),
    });
  };

  render() {
    const { save, order, employees, motives, workTypes, clients } = this.props;
    console.log(order.clientId);
    return (
      <div id="order-list-div">
        <BackButton/>

        <Form
          onSubmit={save}
          initialValues={order}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <Field name="name" component="input" type="text" placeholder="Order Name"/>
              </div>
              <div className="input-field col s12">
                <Field name="clientId">
                  {({ input }) => (
                    <Select
                      value={`${input.value}`}
                      label="Client"
                      onChange={(d) => {
                        input.onChange(d);
                      }}
                    >
                      {[...clients.values()].map((x) => (
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

        <div>
          {order.works.map((work, idx) => (
            <WorkAssignment
              key={`work-${order.id}-${idx}`}
              workTypes={workTypes}
              motives={motives}
              employees={employees}
              work={work}
              onChange={(x) => this.updateWorkRecord(save, order, x, idx)}
            />
          ))}
        </div>

        <div>
          Add new work assignment:
          <WorkAssignment
            key={`new-work-${order.id}`}
            workTypes={workTypes}
            employees={employees}
            motives={motives}
            work={{}}
            onChange={(x) => {
              this.addWorkRecord(save, order, x);
            }}
          />
        </div>
      </div>
    );
  }
}
