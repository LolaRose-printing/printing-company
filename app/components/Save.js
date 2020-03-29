import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadState, saveState } from '../utils/SaveState';
import routes from '../constants/routes';

type Props = {
  state: any,
  changeState: any
};

export default class Save extends Component<Props> {
  props: Props;

  render() {
    const { state, changeState } = this.props;

    return (
      <div>
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
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
