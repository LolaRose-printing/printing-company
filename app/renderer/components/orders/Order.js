import React, { Component } from 'react';
import BackButton from '../tools/BackButton';
import PropTypes from 'prop-types';
import 'materialize-css';
import OrderDetail from './OrderDetail';
import WorkAssignmentsList from './WorkAssignmentsList';

export default class Order extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    order: PropTypes.any.isRequired,
    employees: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
    motives: PropTypes.instanceOf(Set).isRequired,
    clients: PropTypes.array.isRequired,
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

        <OrderDetail clients={clients} save={save} order={order}/>

        <WorkAssignmentsList order={order} save={save}
                             workTypes={workTypes} motives={motives}
                             employees={employees}/>
      </div>
    );
  }
}
