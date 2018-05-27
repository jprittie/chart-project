import { STATS_ACTIONS } from '../actions/chart.actions.js';

// why would I use this? to set current page number and size on state?
export const getHourlyStatsApiRequestReducer = (state = {}, action) => {
  if (action.type === STATS_ACTIONS.GET_HOURLY_STATS) {
    return {...action.payload};
  }
  return state;
};

export const hourlyStatsResultsReducer = (state = [], action) => {
  switch (action.type) {
    case STATS_ACTIONS.HOURLY_STATS_RECEIVED_SUCCESS:
      return { ...state, results: action.payload, isError: false };
    case STATS_ACTIONS.HOURLY_STATS_RECEIVED_ERROR:
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
