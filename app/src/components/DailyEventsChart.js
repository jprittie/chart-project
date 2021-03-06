import React from 'react';
import { connect } from 'react-redux';

import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryBar
} from 'victory';
import './StatsChart.css';

import { getDailyEventsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

class DailyEventsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'dailyEventsChart', endpoint: 'events/daily', queryParams: ``});
  }

  render () {
    return (
      <div className='StatsChart'>
        { (this.props.dailyEventsChart) &&
        <div>
          <h3> Number of Events By Day</h3>
          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension='x'
                labels={(d) => `Events: ${d.y}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />}
              />}
          >
            <VictoryAxis
              tickFormat={(tick) => new Date(tick).toLocaleDateString()}
            />
            <VictoryAxis
              dependentAxis
              tickValues={[15, 20, 25, 30, 35, 40]}
            />
            <VictoryLine
              style={{
                data: { stroke: '#706E8D' },
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
                labels={(d) => `Events: ${d.y}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />}
              />}
          >
            <VictoryAxis
              tickFormat={(tick) => new Date(tick).toLocaleDateString()}
            />
            <VictoryAxis
              dependentAxis
            />
            <VictoryBar
              data={this.props.dailyEventsChart}
              style={{ data: { fill: '#706E8D' } }}
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
