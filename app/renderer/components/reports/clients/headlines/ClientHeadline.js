import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClientHeadline extends Component {
  static propTypes = {
    client: PropTypes.any.isRequired,
  };

  render() {
    const { client } = this.props;

    return (
      <div className="client-headline">
        <div className="client-name">{client.name}</div>
        <div className="client-address">{client.address}</div>
      </div>
    );
  }
}
