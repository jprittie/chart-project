import React from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './HourlyStatsTable.css';

import { getHourlyStats } from '../redux/selectors';
import { hourlyStatsApiRequest } from '../redux/actions/chart.actions.js';

// TODO change timestamp to date to be user-friendly, change revenue to two decimal places
// do this in the selector
// make API call to get page count

class HourlyStatsTable extends React.Component {
  componentDidMount () {
    this.props.hourlyStatsApiRequest({page: 1, page_size: 20});
  }

  render () {
    const { hourlyStats } = this.props;
    const columns = [{
      Header: 'Date',
      accessor: 'date'
    }, {
      Header: 'Hour',
      accessor: 'hour'
    }, {
      Header: 'Impressions',
      accessor: 'impressions'
    }, {
      Header: 'Clicks',
      accessor: 'clicks'
    }, {
      Header: 'Revenue',
      accessor: 'revenue'
    }];

    return (
      <div className='HourlyStatsTable-container'>
        { hourlyStats &&
          <ReactTable
            className='-striped -highlight'
            data={hourlyStats}
            columns={columns}
            showPageSizeOptions={false}
            pages={42}
            manual
            onPageChange={pageIndex => this.props.hourlyStatsApiRequest({page: pageIndex + 1, page_size: 20})}
          />
        }
      </div>
    );
  }
}

/* Container */

const mapStateToProps = (state) => ({
  hourlyStats: getHourlyStats(state)
});

const actions = {
  hourlyStatsApiRequest
};

export default connect(mapStateToProps, actions)(HourlyStatsTable);

