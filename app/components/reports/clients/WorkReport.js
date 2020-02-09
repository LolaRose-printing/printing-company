import React, { Component } from 'react';
import type { Work } from '../../../dtos/Order';
import type { WorkType } from '../../../dtos/WorkType';

type Props = {
  work: Work,
  workType: WorkType,
  showWage: boolean
};

export default class WorkReport extends Component<Props> {
  props: Props;

  render() {
    const { work, workType, showWage } = this.props;

    return (
      <div>
        {work.amount}x -- {workType.name} - | -{' '}
        {showWage ? workType.employeeWage : workType.priceForCustomer}
      </div>
    );
  }
}
