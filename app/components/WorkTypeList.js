// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import type { WorkType } from '../dtos/WorkType';

type Props = {
  saveWorkType: WorkType => void,
  deleteWorkType: WorkType => void,
  workTypeList: Array<WorkType>
};

export default class WorkTypeList extends Component<Props> {
  props: Props;

  render() {
    const { saveWorkType, deleteWorkType, workTypeList } = this.props;

    return (
      <div id="work-types-div">
        <div data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

        <ul id="work-types-list">
          {workTypeList.map(wt => (
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
