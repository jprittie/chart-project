import { combineEpics } from 'redux-observable';

import { getHourlyStatsEpic } from './hourly-stats.epics';

export default combineEpics(
  getHourlyStatsEpic
);

