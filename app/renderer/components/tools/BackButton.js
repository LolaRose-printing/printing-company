import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'materialize-css';
import { Button } from 'react-materialize';
import routes from '../../data/routes';

class BackButton extends Component {
  homeButton = () => (
    <Link to={routes.HOME}>
      <Button
        className="red"
        floating
        icon={<i className="fa fa-arrow-left fa-3x" />}
        large
        node="button"
        waves="light"
      />
    </Link>
  );

  backButton = (history) => (
    <Button
      className="red"
      floating
      icon={<i className="fa fa-arrow-left fa-3x" />}
      large
      onClick={history.goBack}
      node="button"
      waves="light"
    />
  );

  render() {
    const { history } = this.props;
    console.log(history)
    return (
      <div data-tid="backButton" className="no-print back-button">
        {history.length <= 1 ? this.homeButton() : this.backButton(history)}
      </div>
    );
  }
}

export default withRouter(BackButton);
