import WorkAssignment from './WorkAssignment';
import AddNewWorkAssignment from './AddWorkAssignment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';

export default class WorkAssignmentsList extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    order: PropTypes.any.isRequired,
    employees: PropTypes.instanceOf(Object).isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
    motives: PropTypes.instanceOf(Set).isRequired,
  };

  deleteRecord = (save, order, idxToRemove) => {
    save({
      ...order,
      works: order.works.filter((_, idx) => idx !== idxToRemove),
    });
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
    const { save, order, employees, motives, workTypes } = this.props;

    return (
      <div>
        <div id="work-assignments-collection">
          <ul>
            {order.works.map((work, idx) => (
              <li key={idx} className="work-assignment-li">
                <WorkAssignment
                  workTypes={workTypes}
                  motives={motives}
                  employees={employees}
                  work={work}
                  onChange={(x) => this.updateWorkRecord(save, order, x, idx)}
                  deleteAssignment={() => this.deleteRecord(save, order, idx)}
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