import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './ChartContainer.css';
import HourlyEvents from './HourlyEvents';
import DailyEvents from './DailyEvents';
import DailyStats from './DailyStats';
import HourlyStats from './HourlyStats';
import HeatMap from './HeatMap';

const ChartContainer = () => (
  <div>
    <Switch>
      <Route path='/hourlyEvents' component={HourlyEvents} />
      <Route path='/dailyEvents' component={DailyEvents} />
      <Route path='/hourlyStats' component={HourlyStats} />
      <Route path='/dailyStats' component={DailyStats} />
      <Route path='/heatMap' component={HeatMap} />
    </Switch>
  </div>
);

export default ChartContainer;
