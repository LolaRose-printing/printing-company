import WorkAssignment from './WorkAssignment';
import AddNewWorkAssignment from './AddWorkAssignment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class WorkAssignmentsList extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    order: PropTypes.any.isRequired,
    employees: PropTypes.instanceOf(Map).isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
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