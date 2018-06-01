import React from 'react';
import { connect } from 'react-redux';

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryBar
} from 'victory';
import './StatsChart.css';

import { getHourlyEventsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

/** TODO Remove hardcoded date and add UI and related redux so user can select which day to view */

class HourlyEventsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'hourlyEventsChart', endpoint: 'events/hourly', queryParams: ``});
  }
  render () {
    return (
      <div className='StatsChart'>
        { (this.props.hourlyEventsChart) &&
        <div>
          <h3> Number of Events By Hour for {this.props.hourlyEventsChart.date} </h3>
          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension='x'
                labels={(d) => `Events: ${d.y}, Hour: ${d.x}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />}
              />}
          >
            <VictoryLine
              style={{
                data: { stroke: '#706E8D' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.hourlyEventsChart.chartData}
            />
          </VictoryChart>

          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
            domainPadding={{ x: 100 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension='x'
                labels={(d) => `Events: ${d.y}, Hour: ${d.x}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />}
              />}
          >
            <VictoryBar
              data={this.props.hourlyEventsChart.chartData}
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
  hourlyEventsChart: getHourlyEventsChart(state)
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(HourlyEventsChart);
