import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../../dist-assets/routes';
import PropTypes from 'prop-types';

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
        <div data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>

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
