import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './ChartContainer.css';
import HourlyEvents from './HourlyEvents';
import DailyEvents from './DailyEvents';
import DailyStats from './DailyStats';
// import HourlyStats from './HourlyStats';
import HourlyStatsChart from './HourlyStatsChart';
import HourlyStatsTable from './HourlyStatsTable';
import HeatMap from './HeatMap';

const ChartContainer = () => (
  <div className='chart-container nine columns'>
    <Switch>
      <Route path='/hourlyEvents' component={HourlyEvents} />
      <Route path='/dailyEvents' component={DailyEvents} />
      <Route path='/hourlyStatsCharts' component={HourlyStatsChart} />
      <Route path='/hourlyStatsTable' component={HourlyStatsTable} />
      <Route path='/dailyStats' component={DailyStats} />
      <Route path='/heatMap' component={HeatMap} />
    </Switch>
  </div>
);

export default ChartContainer;
