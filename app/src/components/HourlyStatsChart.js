import React from 'react';
import { connect } from 'react-redux';

import { VictoryLine, VictoryChart, VictoryLabel, VictoryAxis, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip } from 'victory';
import './HourlyStatsChart.css';

import { getHourlyStatsChart } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';

// SHOW DATE OF CHART?
// style={{ parent: { maxWidth: '40%', maxHeight: 300 } }}
// must set query params on state, i.e. page size and count; except page count is not determined
// by the user; page number is, though
// take out media queries
// make sure charts don't render before data is calculated
// is clickthrough rate calculated correctly?

class HourlyStatsChart extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'hourlyStatsChart', endpoint: 'stats/hourly', queryParams: `/1/20`});
  }
  render () {
    return (
      <div className='hourlyStatsChartRow'>
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
              data: { stroke: '#c43a31' },
              parent: { border: '1px solid #ccc' }
            }}
            data={this.props.hourlyStatsChart.clickThroughRatePerHour}
          />
        </VictoryChart>
      </div>
    );
  }
}

/* Container */

const mapStateToProps = (state) => ({
  hourlyStatsChart: getHourlyStatsChart(state)
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(HourlyStatsChart);