import React, { Component } from 'react';
import CadekHeadline from './headlines/CadekHeadline';
import ClientOrdersReport from './ClientOrdersReport';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';
import PrintButton from '../../tools/PrintButton';

export default class ClientsReportsList extends Component {
  static propTypes = {
    startDate: PropTypes.any.isRequired,
    endDate: PropTypes.any.isRequired,
    clients: PropTypes.array.isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
  };

  render() {
    const { startDate, endDate, clients, workTypes } = this.props;

    return (
      <div id="clients-reports-div">
        <BackButton/>

        <PrintButton/>

        <CadekHeadline startDate={startDate} endDate={endDate}/>

        <ul>
          {clients
            .map((client) => (
              <li key={`client-${client.id}-report`}>
                <ClientOrdersReport
                  client={client}
                  workTypes={workTypes}
                />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
