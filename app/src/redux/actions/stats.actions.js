export const STATS_ACTIONS = {
  // user
  GET_STATS: 'GET_STATS',

  // epic actions
  STATS_RECEIVED_SUCCESS: 'STATS_RECEIVED_SUCCESS',
  STATS_RECEIVED_ERROR: 'STATS_RECEIVED_ERROR',
  SET_LOADING_STATE: 'SET_LOADING_STATE'
};

export const statsApiRequest = parameters => ({
  type: STATS_ACTIONS.GET_STATS,
  payload: parameters
});

export const setLoadingState = boolean => ({
  type: STATS_ACTIONS.SET_LOADING_STATE,
  payload: boolean
});
