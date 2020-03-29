import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadState, saveState } from '../../utils/stateSaving';
import routes from '../../../../dist-assets/routes';
import PropTypes from 'prop-types';

export default class Save extends Component {
  static propTypes = {
    state: PropTypes.any.isRequired,
    changeState: PropTypes.func.isRequired,
  };

  render() {
    const { state, changeState } = this.props;

    return (
      <div>
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x"/>
        </Link>
        <button type="button" onClick={() => saveState(state)}>
          Save state.
        </button>

        <button type="button" onClick={() => loadState(changeState)}>
          Load state
        </button>
      </div>
    );
  }
}
