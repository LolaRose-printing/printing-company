import React, { Component } from 'react';
import 'materialize-css';
import { Button, Icon } from 'react-materialize';
import PropTypes from 'prop-types';

export default class SubmitButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
  };

  render() {
    const { disabled } = this.props;

    return (
      <Button
        type="submit"
        disabled={disabled}
        className="green context-button"
        floating
        icon={<Icon>check</Icon>}
        small
        node="button"
        waves="light"
      />
    );
  }
}
