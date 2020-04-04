import React, { Component } from 'react';
import { loadState, saveState } from '../../utils/stateSaving';
import PropTypes from 'prop-types';
import BackButton from './BackButton';
import { remote } from 'electron';
import * as storage from 'electron-json-storage';

export default class Save extends Component {

  static propTypes = {
    state: PropTypes.any.isRequired,
    changeState: PropTypes.func.isRequired,
  };

  state = {
    path: storage.getDefaultDataPath(),
  };

  setPath() {
    const { dialog } = remote;
    dialog.showOpenDialog({ properties: ['openDirectory'] },
      (dirs) => {
        if (dirs[0]) this.setState({ path: dirs[0] });
      });
  }

  render() {
    const { state, changeState } = this.props;
    const { path } = this.state;

    return (
      <div>
        <BackButton/>
        <div>
          {path}
        </div>
        <button type="button" onClick={() => saveState(state, path)}>
          Save state.
        </button>

        <button type="button" onClick={() => loadState(changeState, path)}>
          Load state
        </button>

        <button type="button" onClick={() => this.setPath()}>
          Open
        </button>
      </div>
    );
  }
}
