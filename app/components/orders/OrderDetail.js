// @flow

import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import type { Employee } from '../../dtos/Employee';
import type { WorkType } from '../../dtos/WorkType';
import type { Order } from '../../dtos/Order';
import WorkAssignment from './WorkAssignment';
import DatePickerWrapper from '../tools/DatePickerWrapper';
import BackButton from '../../utils/BackButton';

type Props = {
  save: Order => void,
  order: Order,
  employees: Map<number, Employee>,
  workTypes: Map<number, WorkType>,
  clients: Map<number, Client>
};

export default class OrderDetail extends Component<Props> {
  updateWorkRecord = (save, order, updatedWork) => {
    save({
      ...order,
      works: order.works.map(x => {
        if (x.recordId === updatedWork.recordId) {
          return { ...updatedWork };
        }
        return { ...x };
      })
    });
  };

  addWorkRecord = (save, order, newWork) => {
    save({
      ...order,
      works: order.works.concat(newWork)
    });
  };

  createMapWithEmptyEntry = source => {
    const res = new Map();
    res.set(-1, { id: -1, name: '' });
    source.forEach(x => res.set(x.id, x));
    return res;
  };

  render() {
    const { save, order, employees, workTypes, clients } = this.props;
    return (
      <div id="order-list-div">
        <BackButton />

        <Form
          onSubmit={save}
          initialValues={order}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Order Name"
                />
              </div>
              <div>
                <label>Client</label>
                <Field name="clientId" component="select" placeholder="Client">
                  {[...clients.values()].map(x => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label>Notes</label>
                <Field name="notes" component="textarea" placeholder="Notes" />
              </div>

              <Field name="date">
                {({ input }) => (
                  <DatePickerWrapper
                    initDate={input.value}
                    onChange={d => {
                      input.onChange(d);
                    }}
                  />
                )}
              </Field>

              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />

        <div>
          {order.works.map(work => (
            <WorkAssignment
              key={`work-${order.id}-${work.recordId}`}
              workTypes={workTypes}
              employees={employees}
              work={work}
              onChange={x => this.updateWorkRecord(save, order, x)}
            />
          ))}
        </div>

        <div>
          Add new work assignment:
          <WorkAssignment
            key={`new-work-${order.id}`}
            workTypes={this.createMapWithEmptyEntry(workTypes)}
            employees={this.createMapWithEmptyEntry(employees)}
            work={{
              orderId: order.id,
              recordId: Math.max(...order.works.map(x => x.recordId)) + 1,
              workId: -1,
              employeeId: -1
            }}
            onChange={x => {
              this.addWorkRecord(save, order, x);
            }}
          />
        </div>
      </div>
    );
  }
}
