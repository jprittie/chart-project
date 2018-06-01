import React from 'react';
import { connect } from 'react-redux';

import {
  VictoryLine,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryGroup,
  VictoryBar
 } from 'victory';
import './StatsChart.css';

import { getStatsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

class HourlyStatsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'hourlyStatsChart', endpoint: 'stats/hourly', queryParams: `/1/24`});
  }

  render () {
    return (
      <div className='StatsChart'>
        { (this.props.hourlyStatsChart) &&
        <div>
          <h3> Hourly Stats</h3>
          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
            domainPadding={{ y: 10 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension='x'
                labels={(d) => `RPM: $${(d.y).toFixed(2)}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />}
              />}
          >
            <VictoryLabel text='Revenue Per Thousand Impressions (RPM) By Hour' x={225} y={30} textAnchor='middle' />
            <VictoryLine
              style={{
                data: { stroke: '#706E8D' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.hourlyStatsChart.revenuePerThousandImpressionByHour}
            />
          </VictoryChart>
          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
            domainPadding={{ y: 10 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension='x'
                labels={(d) => `CTR: ${(d.y).toFixed(2)}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />}
              />}
          >
            <VictoryLabel text='Clickthrough Rate (CTR) By Hour' x={225} y={30} textAnchor='middle' />
            <VictoryLine
              style={{
                data: { stroke: '#706E8D' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.hourlyStatsChart.clickThroughRatePerHour}
            />
          </VictoryChart>
          <VictoryChart height={200} width={800}
            theme={VictoryTheme.material}
            domainPadding={{ x: 10 }}
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
            <VictoryLabel text='Clicks and Revenue By Hour' x={225} y={30} textAnchor='middle' />
            <VictoryGroup offset={-5}
              colorScale={'qualitative'}
            >
              <VictoryBar
                style={{ data: { fill: '#706E8D' } }}
                alignment='start'
                data={this.props.hourlyStatsChart.revenueByHour}
              />
              <VictoryBar
                style={{ data: { fill: '#4B4A5E' } }}
                alignment='start'
                data={this.props.hourlyStatsChart.clicksByHour}
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
        }
      </div>
    );
  }
}

/* Container */

const mapStateToProps = (state) => ({
  hourlyStatsChart: getStatsChart(state, 'hourlyStatsChart')
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(HourlyStatsChart);
