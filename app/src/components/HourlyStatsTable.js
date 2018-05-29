import React from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './HourlyStatsTable.css';

import { getHourlyStatsTable } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

// TODO change timestamp to date to be user-friendly, change revenue to two decimal places
// do this in the selector
// make API call to get page count
// I'm going to have to make two different API calls; will need to set separate chart and table data on state
// Also I probably want a lot more data for the chart than I do for a table page

class HourlyStatsTable extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'hourlyStatsTable', endpoint: 'stats/hourly', queryParams: `/1/24`});
  }

  render () {
    const { hourlyTableStats } = this.props;
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
        { hourlyTableStats &&
          <ReactTable
            className='-striped -highlight'
            data={hourlyTableStats}
            columns={columns}
            showPageSizeOptions={false}
            pages={50}
            manual
            onPageChange={pageIndex => {
              this.props.statsApiRequest(
                {
                  statsType: 'hourlyStatsTable',
                  endpoint: 'stats/hourly',
                  queryParams: `/${pageIndex + 1}/24`
                }
              );
            }}
          />
        }
      </div>
    );
  }
}

/* Container */

const mapStateToProps = (state) => ({
  hourlyTableStats: getHourlyStatsTable(state)
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(HourlyStatsTable);
