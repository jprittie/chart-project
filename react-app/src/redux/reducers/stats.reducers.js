import { STATS_ACTIONS } from '../actions/stats.actions.js';

const DEFAULT_STATE = {
  hourlyStatsChart: null,
  hourlyStatsTable: null,
  hourlyEventsChart: null,
  dailyEventsChart: null,
  dailyStatsChart: null,
  heatMap: null
};

export const getStatsApiRequestReducer = (state = {}, action) => {
  if (action.type === STATS_ACTIONS.GET_STATS) {
    return {...action.payload};
  }
  return state;
};

export const statsResultsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case STATS_ACTIONS.STATS_RECEIVED_SUCCESS:
      return { ...state, [action.payload.statsType]: action.payload.results, isError: false };
    case STATS_ACTIONS.STATS_RECEIVED_ERROR:
      return { ...state, results: [], isError: true };
    default:
      return state;
  }
};

export const loadingStateReducer = (state = false, action) => {
  if (action.type === STATS_ACTIONS.SET_LOADING_STATE) {
    return action.payload;
  }
  return state;
};
