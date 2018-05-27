import { combineReducers } from 'redux';

import { hourlyStatsResultsReducer, getHourlyStatsApiRequestReducer, loadingStateReducer } from './chart.reducers.js';

export default combineReducers({
  hourlyStats: hourlyStatsResultsReducer,
  loadingState: loadingStateReducer,
  apiRequest: getHourlyStatsApiRequestReducer
});

