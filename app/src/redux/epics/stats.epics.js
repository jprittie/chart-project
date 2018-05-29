import { STATS_ACTIONS } from '../actions/stats.actions.js';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

// Observable.ajax(`stats/hourly/${action.payload.page}/${action.payload.page_size}`)

export const getStatsEpic = action$ =>

  action$.ofType(STATS_ACTIONS.GET_STATS)
    .flatMap(action =>
      Observable.concat(
        // Set loading state before and after API call
        Observable.of({
          type: STATS_ACTIONS.SET_LOADING_STATE,
          payload: true
        }),
        Observable.ajax(`${action.payload.endpoint}${action.payload.queryParams}`)
          .map(({ response }) => ({
            type: STATS_ACTIONS.STATS_RECEIVED_SUCCESS,
            payload: {statsType: `${action.payload.statsType}`, results: response}
          }))
          .catch(error => Observable.of({
            type: STATS_ACTIONS.STATS_RECEIVED_ERROR,
            payload: error.xhr.response,
            error: true
          })),
          Observable.of({
            type: STATS_ACTIONS.SET_LOADING_STATE,
            payload: false
          })

    )
  );
