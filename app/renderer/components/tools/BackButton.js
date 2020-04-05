import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'materialize-css';
import { Button } from 'react-materialize';

class BackButton extends Component {
  render() {
    const { history } = this.props;
    return (
      <div data-tid="backButton" className="no-print back-button">
        <Button
          className="red"
          floating
          icon={<i className="fa fa-arrow-left fa-3x"/>}
          large
          onClick={history.goBack}
          node="button"
          waves="light"
        />
      </div>
    );
  }
}

export default withRouter(BackButton);
