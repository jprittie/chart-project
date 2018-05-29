import { combineEpics } from 'redux-observable';

import { getStatsEpic } from './stats.epics';

export default combineEpics(
  getStatsEpic
);
