import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import AddFromModal from '../tools/AddFromModal';
import ClientEdit from './ClientEdit';

export default class ClientList extends Component {
  static propTypes = {
    saveClient: PropTypes.func.isRequired,
    deleteClient: PropTypes.func.isRequired,
    clients: PropTypes.array.isRequired,
  };

  render() {
    const { saveClient, deleteClient, clients } = this.props;

    return (
      <div id="work-types-div">
        <BackButton/>

        <div id="employees-list">
          <Collapsible accordion={false}>
            {clients.map((e) => (
              <CollapsibleItem
                className="employee-element"
                key={e.id}
                expanded={false}
                header={e.name}
                node="div"
              >
                <ClientEdit
                  save={saveClient}
                  client={e}
                  delete={deleteClient}
                />
              </CollapsibleItem>
            ))}
          </Collapsible>
        </div>

        <div>
          <AddFromModal childrenFactory={(close) => (
            <ClientEdit
              className="employee-element"
              save={(e) => {
                saveClient(e);
                close();
              }}
              client={undefined}
            />
          )}
          />
        </div>
      </div>
    );
  }
}
