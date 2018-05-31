import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './ChartContainer.css';
import HourlyEventsChart from './HourlyEventsChart';
import DailyEventsChart from './DailyEventsChart';
import DailyStatsChart from './DailyStatsChart';
// import HourlyStats from './HourlyStats';
import HourlyStatsChart from './HourlyStatsChart';
import HourlyStatsTable from './HourlyStatsTable';
import HeatMap from './HeatMap';

const ChartContainer = () => (
  <div className='chart-container'>
    <Switch>
      <Route path='/hourlyEvents' component={HourlyEventsChart} />
      <Route path='/dailyEvents' component={DailyEventsChart} />
      <Route path='/hourlyStatsCharts' component={HourlyStatsChart} />
      <Route path='/hourlyStatsTable' component={HourlyStatsTable} />
      <Route path='/dailyStats' component={DailyStatsChart} />
      <Route path='/heatMap' component={HeatMap} />
    </Switch>
  </div>
);

export default ChartContainer;
