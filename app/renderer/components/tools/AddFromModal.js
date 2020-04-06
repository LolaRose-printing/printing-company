import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';
import Modal from 'react-modal';
import { Button, Icon } from 'react-materialize';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    minWidth: '80%',
    minHeight: '80%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export default class AddNewOrder extends Component {
  static propTypes = {
    childrenFactory: PropTypes.func.isRequired,
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
    const { childrenFactory } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <div>
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

          {childrenFactory(this.closeModal)}
        </Modal>

      </div>
    );
  }
}
