import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';
import Modal from 'react-modal';
import { Button, Icon } from 'react-materialize';
import WorkAssignment from './WorkAssignment';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    minWidth: '500px',
    minHeight: '80%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class AddNewWorkAssignment extends Component {
  static propTypes = {
    addWorkRecord: PropTypes.func.isRequired,
    employees: PropTypes.instanceOf(Object).isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
    motives: PropTypes.instanceOf(Set).isRequired,
  };

  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState((state) => ({
      ...state,
      modalIsOpen: true,
    }));
  };

  closeModal = () => {
    this.setState((state) => ({
      ...state,
      modalIsOpen: false,
    }));
  };

  render() {
    const { addWorkRecord, employees, motives, workTypes } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <div id="add-new-work-modal">
        <Button
          className="red"
          icon={<Icon>add</Icon>}
          large
          node="button"
          waves="light"
          onClick={this.openModal}
          fab={{
            direction: 'left',
            hoverEnabled: false,
          }}
          floating
        />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel="Modal">
          <WorkAssignment
            workTypes={workTypes}
            employees={employees}
            motives={motives}
            work={{
              employeeId: 1,
              workTypeId: 1,
            }}
            onChange={(x) => {
              addWorkRecord(x);
              this.closeModal();
            }}
            deleteAssignment={() => {
            }}
            addingNew={true}
          />
        </Modal>
      </div>
    );
  }
}
