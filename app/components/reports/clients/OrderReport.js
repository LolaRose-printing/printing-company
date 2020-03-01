import React, { Component } from 'react';
import type { Order } from '../../../dtos/Order';
import type { WorkType } from '../../../dtos/WorkType';
import WorkReport from './WorkReport';
import { geOrderPrice } from '../../../utils/PriceComputation';

type Props = {
  order: Order,
  workTypes: Map<number, WorkType>
};

export default class OrderReport extends Component<Props> {
  props: Props;

  render() {
    const { order, workTypes } = this.props;

    const groupedTypes = new Map();
    new Set(order.works.map(x => x.workTypeId)).forEach(workType => {
      groupedTypes[workType] = 0;
    });

    order.works.forEach(w => {
      groupedTypes[w.workTypeId] += w.amount;
    });

    const finalPrice = geOrderPrice(order, workTypes);

    return (
      <div>
        Order: {order.name}
        Client id: {order.clientId}
        <ul>
          {[...groupedTypes].map(([workTypeId, amount]) => (
            <li key={`order-${order.id}-work-${workTypeId}`}>
              <WorkReport
                work={{ amount }}
                workType={workTypes[workTypeId]}
                showWage={false}
              />
            </li>
          ))}
        </ul>
        Final price: {finalPrice}Eur.
      </div>
    );
  }
}
