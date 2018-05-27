export const STATS_ACTIONS = {
  // user
  GET_HOURLY_STATS: 'GET_HOURLY_STATS',

  // epic actions
  HOURLY_STATS_RECEIVED_SUCCESS: 'HOURLY_STATS_RECEIVED_SUCCESS',
  HOURLY_STATS_RECEIVED_ERROR: 'HOURLY_STATS_RECEIVED_ERROR',
  SET_LOADING_STATE: 'SET_LOADING_STATE'
};

export const hourlyStatsApiRequest = parameters => ({
  type: STATS_ACTIONS.GET_HOURLY_STATS,
  payload: parameters
});

export const setLoadingState = boolean => ({
  type: STATS_ACTIONS.SET_LOADING_STATE,
  payload: boolean
});
