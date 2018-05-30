import React from 'react';
import { connect } from 'react-redux';

import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryBar } from 'victory';
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
        { (this.props.dailyEventsChart) &&
        <div>
          <h3> Number of Events By Day</h3>
          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
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
            {/* }<VictoryLabel text='Number of Events By Day' x={225} y={30} textAnchor='middle' /> */}
            <VictoryAxis
              tickFormat={(tick) => new Date(tick).toLocaleDateString()}
            />
            <VictoryAxis
              dependentAxis
              tickValues={[15, 20, 25, 30, 35, 40]}
            />
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
            domainPadding={{ x: 40 }}
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
            {/* <VictoryLabel text='Number of Events By Day' x={225} y={30} textAnchor='middle' /> */}
            <VictoryAxis
              tickFormat={(tick) => new Date(tick).toLocaleDateString()}
            />
            <VictoryAxis
              dependentAxis
              // tickValues={[15, 20, 25, 30, 35, 40]}
            />
            <VictoryBar
              data={this.props.dailyEventsChart}
            />
          </VictoryChart>
        </div>
        }
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
