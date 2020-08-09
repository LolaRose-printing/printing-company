import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'materialize-css';
import { Table } from 'react-materialize';
import format from '../../../utils/dateFormatter';
import midnightDay from '../../../utils/Midnight';

export default class OrderReport extends Component {
  static propTypes = {
    order: PropTypes.instanceOf(Object).isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { order, workTypes } = this.props;
    const lastTdStyle = { textAlign: 'right' };
    return (
      <div className="order-report">
        <span className="order-name">Auftrag Nr.: {order.name} - {format(midnightDay(order.date))}</span>
        <div className="report-data">
          <Table className="employee-monthly-table">
            <thead>
            <tr>
              <th data-field="motive">Motiv Nr</th>
              <th data-field="amount">Liefer Menge</th>
              <th data-field="workType">Operation</th>
              <th data-field="workTypePrice">Preis/1000</th>
              <th data-field="price" style={lastTdStyle}>Preis total</th>
            </tr>
            </thead>
            <tbody>
            {order.workRecords.map((record, idx) => {
              const workType = workTypes[record.workTypeId];
              return (
                <tr key={idx}>
                  <td>{record.motive}</td>
                  <td>{record.amount}</td>
                  <td>{workType.name}</td>
                  <td>{workType.priceForCustomer}</td>
                  <td style={lastTdStyle}>{record.displayPrice} Eur</td>
                </tr>
              );
            })}
            <tr className="employee-report-sum">
              <td>Preis total</td>
              <td/>
              <td/>
              <td/>
              <td style={lastTdStyle}>{order.displayPrice} Eur</td>
            </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
