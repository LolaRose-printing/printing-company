import React, { Component } from 'react';
import WorkReport from './WorkReport';
import PropTypes from 'prop-types';

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export default class OrderReport extends Component {
  static propTypes = {
    order: PropTypes.any.isRequired,
    motives: PropTypes.instanceOf(Map).isRequired,
    workTypes: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const { order, motives, workTypes } = this.props;

    const groupedMotives = groupBy(order.works, x => x.motiveId);

    const results = [...groupedMotives.keys()].flatMap(motiveId => {
        const motiveWorks = groupedMotives.get(motiveId);
        const workTypesForMotive = groupBy(motiveWorks, x => x.workTypeId);
        return [...workTypesForMotive.keys()].map(workTypeId => {
            return {
              motiveId,
              workTypeId,
              amount: workTypesForMotive.get(workTypeId).reduce((a, b) => a + b.amount, 0),
            };
          },
        );
      },
    );

    const finalPrice = results.reduce((a, b) =>
      a + workTypes.get(b.workTypeId).priceForCustomer * b.amount,
      0);
    return (
      <div>
        Order: {order.name}
        Client id: {order.clientId}
        <div>
          <ul>
            {results.map((record, idx) => (
              <li key={idx}>
                <WorkReport work={{ amount: record.amount }}
                            motive={motives.get(record.motiveId)}
                            workType={workTypes.get(record.workTypeId)}
                            showWage={false}/>
              </li>
            ))}
          </ul>
        </div>
        Final price: {finalPrice}Eur.
      </div>
    );
  }
}
