import React from 'react';
import { connect } from 'react-redux';

import { VictoryLine, VictoryChart, VictoryLabel, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryGroup, VictoryBar } from 'victory';
import './HourlyStatsChart.css';

import { getDailyEventsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

class DailyEventsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'dailyEventsChart', endpoint: 'events/daily', queryParams: ``});
  }
  render () {
    return (
      <div className='hourlyStatsChart'>
        <h3> Events By Day</h3>
        <VictoryChart height={200} width={800}
          theme={VictoryTheme.material}
          domainPadding={{ y: 10 }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension='x'
              labels={(d) => `${d.y}`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={0}
                  flyoutStyle={{ fill: 'white' }}
                />}
            />}
        >
          <VictoryLabel text='Number of Events By Day' x={225} y={30} textAnchor='middle' />
          <VictoryLine
            style={{
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            data={this.props.dailyEventsChart}
          />
        </VictoryChart>

        <VictoryChart height={200} width={800}
          theme={VictoryTheme.material}
          domainPadding={{ y: 10 }}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension='x'
              labels={(d) => `${d.y}`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={0}
                  flyoutStyle={{ fill: 'white' }}
                />}
            />}
        >
          <VictoryLabel text='Number of Events By Day' x={225} y={30} textAnchor='middle' />
          <VictoryBar
            data={this.props.dailyEventsChart}
          />
        </VictoryChart>
      </div>
    );
  }
}

/* Container */

const mapStateToProps = (state) => ({
  dailyEventsChart: getDailyEventsChart(state)
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(DailyEventsChart);
