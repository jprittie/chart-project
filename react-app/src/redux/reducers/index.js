import { combineReducers } from 'redux';

import { statsResultsReducer, getStatsApiRequestReducer, loadingStateReducer } from './stats.reducers.js';

export default combineReducers({
  stats: statsResultsReducer,
  loadingState: loadingStateReducer,
  apiRequest: getStatsApiRequestReducer
});
