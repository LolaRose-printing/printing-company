import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'materialize-css';
import OrderDetail from './OrderDetail';
import AddFromModal from '../tools/AddFromModal';

export default class AddNewOrder extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    clients: PropTypes.array.isRequired,
  };

  render() {
    const { clients, save } = this.props;

    return (
      <div id="add-new-work-modal">
        <AddFromModal
          childrenFactory={(close) => (
            <OrderDetail
              clients={clients}
              order={{
                date: (new Date()).toISOString(),
                clientId: 1,
                works: [],
              }}
              save={(x) => {
                save(x);
                close();
              }}
            />
          )}
        />
      </div>
    );
  }
}
