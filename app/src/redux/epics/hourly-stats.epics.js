import { STATS_ACTIONS } from '../actions/chart.actions.js';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

export const getHourlyStatsEpic = action$ =>

  action$.ofType(STATS_ACTIONS.GET_HOURLY_STATS)
    .flatMap(action =>
      Observable.concat(
        // Set loading state before and after API call
        Observable.of({
          type: STATS_ACTIONS.SET_LOADING_STATE,
          payload: true
        }),
        Observable.ajax(`stats/hourly/${action.payload.page}/${action.payload.page_size}`)
          .map(({ response }) => ({
            type: STATS_ACTIONS.HOURLY_STATS_RECEIVED_SUCCESS,
            payload: response
          }))
          .catch(error => Observable.of({
            type: STATS_ACTIONS.HOURLY_STATS_RECEIVED_ERROR,
            payload: error.xhr.response,
            error: true
          })),
          Observable.of({
            type: STATS_ACTIONS.SET_LOADING_STATE,
            payload: false
          })

    )
  );
