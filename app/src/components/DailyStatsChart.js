import React from 'react';
import { connect } from 'react-redux';

import { VictoryLine, VictoryChart, VictoryLabel, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryGroup, VictoryBar } from 'victory';
import './HourlyStatsChart.css';

import { getStatsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

// TODO make date actual day instead of a number
class DailyStatsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'dailyStatsChart', endpoint: '/stats/daily', queryParams: ``});
  }

  render () {
    return (
      <div className='hourlyStatsChart'>
        { (this.props.dailyStatsChart) &&
        <div>
          <h3> Daily Stats</h3>
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
            <VictoryLabel text='Revenue Per Thousand Impressions (RPM) By Day' x={225} y={30} textAnchor='middle' />
            {/* }<VictoryAxis />
            <VictoryAxis
              dependentAxis
              tickValues={[200, 400, 600, 800]}
              tickFormat={(tick) => `$${tick}`}
            /> */}
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.dailyStatsChart.revenuePerThousandImpressionByHour}
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
            <VictoryLabel text='Clickthrough Rate (CTR) By Day' x={225} y={30} textAnchor='middle' />
            <VictoryLine
              style={{
                data: { stroke: '#c43a31' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.dailyStatsChart.clickThroughRatePerHour}
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
            <VictoryLabel text='Clicks and Revenue By Day' x={225} y={30} textAnchor='middle' />
            <VictoryGroup offset={-25}
              colorScale={'qualitative'}
            >
              <VictoryBar
                data={this.props.dailyStatsChart.revenueByHour}
              />
              <VictoryBar
                data={this.props.dailyStatsChart.clicksByHour}
              />
              {/*
              <VictoryBar
                data={this.props.hourlyStatsChart.impressionsByHour}
              />
              */}
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
  dailyStatsChart: getStatsChart(state, 'dailyStatsChart')
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(DailyStatsChart);
