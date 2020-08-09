import React, { Component } from 'react';
import PropTypes from 'prop-types';
import midnightDay from '../../../utils/Midnight';
import { Link } from 'react-router-dom';
import routes from '../../../data/routes.json';
import { Button } from 'react-materialize';
import 'materialize-css';

export default class TaxCardButton extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    employeeId: PropTypes.number.isRequired,
  };

  render() {
    const { startDate, endDate, employeeId } = this.props;

    const filter = JSON.stringify({
        employeesIds: [employeeId],
        startDate: midnightDay(startDate),
        endDate: midnightDay(endDate),
      },
    );
    return (
      <Link to={`${routes.SPECIFIC_EMPLOYEES_TAX_CARD}${filter}`}>
        <Button className="blue" node="div" waves="light">
          Daňový doklad
        </Button>
      </Link>
    );
  }

}