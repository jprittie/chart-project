import React from 'react';
import { connect } from 'react-redux';

import { VictoryLine, VictoryChart, VictoryLabel, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryBar } from 'victory';
import './HourlyStatsChart.css';

import { getEventsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

// TODO to render day, must also send back date from selector
// just restructure it into an object with date: and values:
class HourlyEventsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'hourlyEventsChart', endpoint: 'events/hourly', queryParams: ``});
  }
  render () {
    return (
      <div className='hourlyStatsChart'>
        { (this.props.hourlyEventsChart) &&
        <div>
          <h3> Number of Events By Hour </h3>
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
            {/* }<VictoryLabel text='Events By Hour' x={225} y={30} textAnchor='middle' /> */}
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.hourlyEventsChart}
            />
          </VictoryChart>

          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
            domainPadding={{ x: 100 }}
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
            {/* }<VictoryLabel text='Number of Events By Hour' x={225} y={30} textAnchor='middle' /> */}
            <VictoryBar
              data={this.props.hourlyEventsChart}
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
  hourlyEventsChart: getEventsChart(state, 'hourlyEventsChart')
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(HourlyEventsChart);
