import React from 'react';
import { connect } from 'react-redux';
import './ChartContainer.css';

import { getHourlyStats } from '../redux/selectors';
import { hourlyStatsApiRequest } from '../redux/actions/chart.actions.js';

class HourlyStatsTable extends React.Component {
  componentDidMount () {
    this.props.hourlyStatsApiRequest({page: 1, page_size: 20});
  }

  render () {
    const { hourlyStats } = this.props;
    return (
      <div>
        This is a placeholder for the hourly stats table.
        { hourlyStats &&
          hourlyStats.map(data => <li>{data.clicks}</li>)
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

