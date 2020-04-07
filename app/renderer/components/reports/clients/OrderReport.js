import React, { Component } from 'react';
import PropTypes from 'prop-types';
import groupBy from '../../../utils/groupBy';

import 'materialize-css';
import { Table } from 'react-materialize';


export default class OrderReport extends Component {
  static propTypes = {
    order: PropTypes.any.isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
  };

  getMapping = (works, workTypeMap) => {
    const groupedMotives = groupBy(works, x => x.motive);

    return [...groupedMotives.keys()].flatMap(motive => {
      const motiveWorks = groupedMotives.get(motive);
      const workTypesForMotive = groupBy(motiveWorks, x => x.workTypeId);

      return [...workTypesForMotive.keys()].map(workTypeId => {
          const amount = workTypesForMotive.get(workTypeId).reduce((a, b) => a + b.amount, 0);
          const workType = workTypeMap.get(workTypeId);
          return {
            motive,
            workType: workType.name,
            workTypePrice: workType.priceForCustomer,
            amount,
            price: workType.priceForCustomer * amount,
          };
          },
        );
      },
    );
  };

  render() {
    const { order, workTypes } = this.props;

    const results = this.getMapping(order.works, workTypes);

    const finalPrice = results.reduce((a, b) => a + b.price, 0);
    return (
      <div className="order-report">
        <span className="order-name">Order: {order.name}</span>

        <div className="report-data">
          <Table className="employee-monthly-table">
            <thead>
            <tr>
              <th data-field="motive">Motive</th>
              <th data-field="amount">Amount</th>
              <th data-field="workType">Wage</th>
              <th data-field="workTypePrice">Price per unit</th>
              <th data-field="price">Sum Price</th>
            </tr>
            </thead>
            <tbody>
            {results.map((record, idx) => (
              <tr key={idx}>
                <td>{record.motive}</td>
                <td>{record.amount}</td>
                <td>{record.workType}</td>
                <td>{record.workTypePrice}</td>
                <td>{record.price}</td>
              </tr>
            ))}
            <tr className="employee-report-sum">
              <td>Sum</td>
              <td/>
              <td/>
              <td/>
              <td>{finalPrice} Eur</td>
            </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
