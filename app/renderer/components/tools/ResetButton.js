import React, { Component } from 'react';
import 'materialize-css';
import { Button, Icon } from 'react-materialize';
import PropTypes from 'prop-types';

export default class ResetButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { disabled, onClick } = this.props;

    return (
      <Button
        type="submit"
        disabled={disabled}
        className="orange context-button"
        floating
        icon={<Icon>repeat</Icon>}
        small
        node="button"
        waves="light"
        onClick={onClick}
      />
    );
  }
}