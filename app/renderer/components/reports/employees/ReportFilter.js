import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackButton from '../../tools/BackButton';
import DateRangeSelector from '../../tools/DateRangeSelector';
import routes from '../../../data/routes';
import { Button } from 'react-materialize';
import midnightDay from '../../../utils/Midnight';

export default class ReportFilter extends Component {
  static propTypes = {
    employees: PropTypes.array.isRequired,
  };

  state = {
    selected: [],
    startDate: null,
    endDate: null,
  };

  stateToFilter = (selected, startDate, endDate) => {
    return {
      employeesIds: selected.map((x) => x.value),
      startDate: midnightDay(startDate),
      endDate: midnightDay(endDate),
    };
  };

  serialize = (selected, startDate, endDate) =>
    JSON.stringify(this.stateToFilter(selected, startDate, endDate));

  dataSelected = (state) => state.selected.length > 0 && state.startDate && state.endDate;

  render() {
    const { employees } = this.props;
    const { startDate, endDate, selected } = this.state;

    const employeesOptions = employees.map((emp) => {
      return { value: emp.id, label: `${emp.name} ${emp.surname}` };
    });

    return (
      <div>
        <BackButton/>

        <div className="employee-reports-filter">
          <DateRangeSelector rangeOnChange={(x) => this.setState(x)}/>

          <div className="employees-select">
            <Select
              placeholder="Vybrat zaměstnance"
              value={selected}
              onChange={(x) => this.setState({ selected: x || [] })}
              isMulti
              name="employees"
              options={employeesOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>

          {this.dataSelected(this.state) ? (
            <div className="to-report-navigation">
              <div className="to-report-link">
                <GranularReport selected={selected} endDate={endDate} startDate={startDate}/>
              </div>
              <div className="to-report-link">
                <YearlyReport selected={selected} endDate={endDate} startDate={startDate}/>
              </div>
              <div className="to-report-link">
                <TaxCard selected={selected} endDate={endDate} startDate={startDate}/>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

class YearlyReport extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.array.isRequired,
  };

  render() {
    const { startDate, endDate, selected } = this.props;
    const filter = serialize(selected, startDate, endDate);
    return (
      <Link to={`${routes.SPECIFIC_EMPLOYEES_YEARLY_REPORTS}${filter}`}>
        <Button className="red" node="div" waves="light">
          Po měsících
        </Button>
      </Link>
    );
  }
}

class GranularReport extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.array.isRequired,
  };

  render() {
    const { startDate, endDate, selected } = this.props;
    const filter = serialize(selected, startDate, endDate);
    return (
      <Link to={`${routes.SPECIFIC_EMPLOYEES_REPORTS}${filter}`}>
        <Button className="red" node="div" waves="light">
          Po pracích
        </Button>
      </Link>
    );
  }
}

class TaxCard extends Component {
  static propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.array.isRequired,
  };

  shouldShow = selected => selected.length === 1;

  render() {
    const { startDate, endDate, selected } = this.props;
    const filter = serialize(selected, startDate, endDate);
    return this.shouldShow(selected) ? (
      <Link to={`${routes.SPECIFIC_EMPLOYEES_TAX_CARD}${filter}`}>
        <Button className="red" node="div" waves="light">
          Daňový doklad
        </Button>
      </Link>
    ) : null;
  }
}


const stateToFilter = (selected, startDate, endDate) => {
  return {
    employeesIds: selected.map((x) => x.value),
    startDate: midnightDay(startDate),
    endDate: midnightDay(endDate),
  };
};

const serialize = (selected, startDate, endDate) =>
  JSON.stringify(stateToFilter(selected, startDate, endDate));
