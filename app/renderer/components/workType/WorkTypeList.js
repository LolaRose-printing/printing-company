import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';

export default class WorkTypeList extends Component {
  static propTypes = {
    saveWorkType: PropTypes.func.isRequired,
    deleteWorkType: PropTypes.func.isRequired,
    workTypeList: PropTypes.array.isRequired,
  };

  render() {
    const { saveWorkType, deleteWorkType, workTypeList } = this.props;

    return (
      <div id="work-types-div">
        <BackButton/>

        <ul id="work-types-list">
          {workTypeList.map((wt) => (
            <li key={wt.id}>
              {wt.name}
              <button type="button" onClick={() => saveWorkType(wt)}>
                Save
              </button>
              <button type="button" onClick={() => deleteWorkType(wt.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
