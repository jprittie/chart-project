import React from 'react';
import { connect } from 'react-redux';

import { VictoryLine, VictoryChart, VictoryLabel, VictoryAxis, VictoryTheme } from 'victory';
import './HourlyStatsChart.css';

import { getHourlyChartStats } from '../redux/selectors';
import { hourlyStatsTableApiRequest } from '../redux/actions/chart.actions.js';

// but I don't want this data limited to a single data page
// say, graph a week's worth of hourly stats
// one axis is hour, y-axis is date, values show
// or maybe revenue by hour makes more sense
// const HourlyStatsChart = ({hourlyStatsChart}) => {

class HourlyStatsChart extends React.Component {
  componentDidMount () {
    this.props.hourlyStatsTableApiRequest({page: 1, page_size: 20});
  }
  render () {
    return (
      <div className='hourlyStatsChart'>
        <VictoryChart
          theme={VictoryTheme.material}
        >
          <VictoryLabel text='Revenue By Hour' x={225} y={30} textAnchor='middle' />
          <VictoryAxis />
          <VictoryAxis
            dependentAxis
            tickValues={[200, 400, 600, 800]}
            tickFormat={(tick) => `$${tick}`}
          />
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            data={this.props.hourlyStatsChart}
          />
        </VictoryChart>
      </div>
    );
  }
}

/* Container */

const mapStateToProps = (state) => ({
  hourlyStatsChart: getHourlyChartStats(state)
});

const actions = {
  hourlyStatsTableApiRequest
};

export default connect(mapStateToProps, actions)(HourlyStatsChart);
