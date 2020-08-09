import React, { Component } from 'react';
import 'materialize-css';
import { Button, Icon } from 'react-materialize';
import PropTypes from 'prop-types';

export default class DeleteButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { disabled, onClick } = this.props;

    return (
      <Button
        className="red context-button"
        floating
        disabled={disabled || false}
        icon={<Icon>delete</Icon>}
        small
        node="button"
        waves="light"
        onClick={onClick}
      />
    );
  }
}
