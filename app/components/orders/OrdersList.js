// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import routes from '../../constants/routes';
import type { Employee } from '../../dtos/Employee';
import type { WorkType } from '../../dtos/WorkType';
import type { Order } from '../../dtos/Order';
import detailStyles from '../employee/EmployeeDetail.css';
import OrderDetail from './OrderDetail';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

type Props = {
  saveOrder: Order => void,
  deleteOrder: number => void,
  orders: Array<Order>,
  employees: Map<number, Employee>,
  workTypes: Map<number, WorkType>,
  clients: Map<number, Client>
};

export default class OrdersList extends Component<Props> {
  props: Props;

  state = {
    modalIsOpen: false,
    orderInModal: null
  };

  openModal = (order: Order) => {
    this.setState(state => ({
      ...state,
      modalIsOpen: true,
      orderInModal: order
    }));
  };

  closeModal = () => {
    this.setState(state => ({
      ...state,
      modalIsOpen: false
      // orderInModal: null //TODO maybe bug?
    }));
  };

  render() {
    const {
      saveOrder,
      // eslint-disable-next-line no-unused-vars
      deleteOrder,
      orders,
      employees,
      workTypes,
      clients
    } = this.props;

    const { modalIsOpen, orderInModal } = this.state;

    return (
      <div id="order-list-div">
        <div data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

        <ul id="orders-list">
          {orders.map(wt => (
            <li key={wt.id}>
              <button type="button" onClick={() => this.openModal(wt)}>
                {wt.name}
              </button>
            </li>
          ))}
        </ul>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel="Example Modal"
        >
          <div className={detailStyles.detailBox}>
            <OrderDetail
              save={x => {
                saveOrder(x);
                this.closeModal();
              }}
              order={orderInModal}
              employees={employees}
              workTypes={workTypes}
              clients={clients}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
