import React from 'react';
import { connect } from 'react-redux';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './StatsTable.css';

import { getHourlyStatsTable } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

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
      <div className='StatsTable'>
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
