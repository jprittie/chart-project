/* global google */
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
// export const getHourlyStatsChart = (state) => {
//   return state.stats.hourlyStatsChart;
// };

export const getHourlyStatsTable = (state) => {
  return state.stats.hourlyStatsTable;
};

// Clickthrough rate (CTR)
// The clickthrough rate (CTR) is the percentage of impressions that led to a click.
// CTR = Clicks / Impressions

export const getStatsChart = (state, typeOfStatsChart) => {
  const hourlyStats = state.stats[typeOfStatsChart];
  if (hourlyStats) {
    var revenuePerImpressionsStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: (parseInt(dataRow.revenue) / (dataRow.impressions) * 1000)});
    });
    var clickThroughStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.clicks) / parseInt(dataRow.impressions) * 100});
    });
    var transformedRevenueStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.revenue)});
    });
    var transformedClicksStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: dataRow.clicks});
    });
    var transformedImpressionsStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: dataRow.impressions});
    });
  }
  // but return a whole object
  return {
    revenuePerThousandImpressionByHour: revenuePerImpressionsStats,
    clickThroughRatePerHour: clickThroughStats,
    revenueByHour: transformedRevenueStats,
    clicksByHour: transformedClicksStats,
    impressionsByHour: transformedImpressionsStats
  };
};

export const getEventsChart = (state, typeOfStatsChart) => {
  const eventsResults = state.stats[typeOfStatsChart];
  if (eventsResults) {
    var filteredResults = eventsResults.filter(dataRow => dataRow.date == '2017-01-01T00:00:00.000Z');
    var transformedResults = filteredResults.map(dataRow => {
      return {x: dataRow.events, y: dataRow.hour};
    });
    console.log(transformedResults);
  }
  return transformedResults;
};

export const getDailyEventsChart = (state) => {
  const eventsResults = state.stats.dailyEventsChart;
  if (eventsResults) {
    var transformedResults = eventsResults.map(dataRow => {
      var msec = Date.parse(dataRow.date);
      var d = new Date(msec);

      return {x: new Date(d), y: parseInt(dataRow.events)};
    });
    console.log(transformedResults);
  }
  return transformedResults;
};

// {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
// const data = [
//   new google.maps.LatLng(37.782551, -122.445368),
//   new google.maps.LatLng(37.782745, -122.444586),
//   new google.maps.LatLng(37.782842, -122.443688),
//   new google.maps.LatLng(37.782919, -122.442815),
//   new google.maps.LatLng(37.782992, -122.442112),
//   new google.maps.LatLng(37.783100, -122.441461)
// ];
export const getMapData = (state) => {
  const mapResults = state.stats.heatMap;
  // return data;
  // on state, map filters will be set by default to impressions and a 24 hour time period
  // getState of filter category and time period; will need category as a variable in template string
  // first, filter by selected category(i.e. impressions) and by time range (do separate filter function)
  // then transform data that is left
  // then mockMapData.map(dataRow => {
  // return `{location: new google.maps.LatLng(${dataRow.lat},${dataRow.lon}, weight: ${dataRow[category]}) }`)
  // return `{location: new google.maps.LatLng(${dataRow.lat},${dataRow.lon}, weight: ${dataRow.impressions}) }`;
  // { location: new google.maps.LatLng(dataRow.lat, dataRow.lon), weight: dataRow.impressions }

  // return state.mapData;
  if (mapResults) {
    var transformedResults = mapResults.map(dataRow => {
      return `{location: new google.maps.LatLng(${dataRow.lat},${dataRow.lon}, weight: ${dataRow.impressions}) }`;
    });
  }
  // console.log(JSON.stringify(transformedResults));
  // return transformedResults;
  return mapResults;
};
