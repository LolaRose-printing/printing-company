import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../tools/BackButton';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import AddFromModal from '../tools/AddFromModal';
import WorkTypeEdit from './WorkTypeEdit';

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
        <BackButton/>

        <div id="employees-list">
          <Collapsible accordion={false}>
            {workTypeList.map((e) => (
              <CollapsibleItem
                className="employee-element"
                key={e.id}
                expanded={false}
                header={e.name}
                node="div"
              >
                <WorkTypeEdit
                  save={saveWorkType}
                  workType={e}
                  delete={deleteWorkType}
                />
              </CollapsibleItem>
            ))}
          </Collapsible>
        </div>

        <div>
          <AddFromModal childrenFactory={(close) => (
            <WorkTypeEdit
              className="employee-element"
              save={(e) => {
                saveWorkType(e);
                close();
              }}
              detail={undefined}
            />
          )}
          />
        </div>
      </div>
    );
  }
}
