import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import WorkAssignment from './WorkAssignment';
import DatePickerWrapper from '../tools/DatePickerWrapper';
import BackButton from '../tools/BackButton';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Select } from 'react-materialize';
import AddNewWorkAssignment from './AddWorkAssignment';

export default class OrderDetail extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    order: PropTypes.any.isRequired,
    employees: PropTypes.instanceOf(Map).isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
    clients: PropTypes.instanceOf(Map).isRequired,
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
    return (
      <div id="order-detail-container">
        <BackButton/>

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

        <div id="work-assignments-collection">
          <ul>
            {order.works.map((work, idx) => (
              <li key={idx} className="work-assignment-li">
                <WorkAssignment
                  key={`work-${order.id}-${idx}`}
                  workTypes={workTypes}
                  motives={motives}
                  employees={employees}
                  work={work}
                  onChange={(x) => this.updateWorkRecord(save, order, x, idx)}
                />
              </li>
            ))}
          </ul>
        </div>

        <AddNewWorkAssignment employees={employees} motives={motives} workTypes={workTypes}
                              addWorkRecord={newWork => this.addWorkRecord(save, order, newWork)}/>
      </div>
    );
  }
}
