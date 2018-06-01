import React from 'react';
import { connect } from 'react-redux';

import {
  VictoryLine,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryBar
} from 'victory';
import './StatsChart.css';

import { getStatsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

class DailyStatsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'dailyStatsChart', endpoint: '/stats/daily', queryParams: ``});
  }

  render () {
    return (
      <div className='StatsChart'>
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
            <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} />
            <VictoryAxis dependentAxis />
            <VictoryLine
              style={{
                data: { stroke: '#706E8D' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.dailyStatsChart.revenuePerThousandImpressionByHour}
            />
          </VictoryChart>
          <VictoryChart height={200} width={800}
            domainPadding={{ y: 10 }}
            style={{
              labels: {fontSize: 12, fontFamily: 'Roboto, sans-serif'}
            }}
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
            <VictoryLabel
              text='Clickthrough Rate (CTR) By Day'
              x={225} y={30}
              textAnchor='middle'
            />
            <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} />
            <VictoryAxis dependentAxis />
            <VictoryLine
              style={{
                data: { stroke: '#706E8D' },
                parent: { border: '1px solid #ccc' }
              }}
              data={this.props.dailyStatsChart.clickThroughRatePerHour}
            />
          </VictoryChart>
          <VictoryChart height={200} width={800}
            domainPadding={{x: 5}}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension='x'
                labels={(d) => `Clicks: ${d.y}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                  />}
              />}
          >
            <VictoryLabel text='Clicks By Day' x={225} y={30} textAnchor='middle' />
            <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={this.props.dailyStatsChart.clicksByHour}
              style={{ data: { fill: '#4B4A5E' } }}
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
  dailyStatsChart: getStatsChart(state, 'dailyStatsChart')
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(DailyStatsChart);
