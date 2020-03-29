import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BackButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <div data-tid="backButton">
        <button onClick={history.goBack} type="button">
          <i className="fa fa-arrow-left fa-3x" />
        </button>
      </div>
    );
  }
}

export default withRouter(BackButton);
