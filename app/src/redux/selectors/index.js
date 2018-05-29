/* global google */

// export const getHourlyStatsChart = (state) => {
//   return state.stats.hourlyStatsChart;
// };

export const getHourlyStatsTable = (state) => {
  return state.stats.hourlyStatsTable;
};

// Clickthrough rate (CTR)
// The clickthrough rate (CTR) is the percentage of impressions that led to a click.
// CTR = Clicks / Impressions

export const getHourlyStatsChart = (state) => {
  const hourlyStats = state.stats.hourlyStatsChart;
  if (hourlyStats) {
    var transformedRevenueStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: (parseInt(dataRow.revenue) / (dataRow.impressions) * 1000)});
    });
    var transformedClicksStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.clicks)});
    });
    var transformedImpressionsStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.impressions)});
    });
    var clickThroughStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.clicks) / parseInt(dataRow.impressions) * 100});
    });
  }
  // but return a whole object
  return {
    revenuePerThousandImpressionByHour: transformedRevenueStats,
    clickThroughRatePerHour: clickThroughStats,
    clicksByHour: transformedClicksStats,
    impressionsByHour: transformedImpressionsStats
  };
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

  // return data;
  // on state, map filters will be set by default to impressions and a 24 hour time period
  // getState of filter category and time period; will need category as a variable in template string
  // first, filter by selected category(i.e. impressions) and by time range (do separate filter function)
  // then transform data that is left
  // then mockMapData.map(dataRow => {
  // return `{location: new google.maps.LatLng(${dataRow.lat},${dataRow.lon}, weight: ${dataRow[category]}) }`)

  // return state.mapData;
};

const mockMapData = [
  {'date': '2017-01-01T00:00:00.000Z', 'hour': 0, 'impressions': 10746, 'clicks': 23, 'revenue': '64.9215630000000', 'poi_id': 3, 'lat': 43.0896, 'lon': -79.0849, 'poi_name': 'NiagaraFalls'},
  {'date': '2017-01-01T00:00:00.000Z', 'hour': 1, 'impressions': 141397, 'clicks': 201, 'revenue': '696.4485960000000', 'poi_id': 4, 'lat': 49.2965, 'lon': -123.0884, 'poi_name': 'VancouverHarbour'},
  {'date': '2017-01-01T00:00:00.000Z', 'hour': 2, 'impressions': 137464, 'clicks': 217, 'revenue': '732.0955030000000', 'poi_id': 1, 'lat': 43.6708, 'lon': -79.3899, 'poi_name': 'EQWorks'},
  {'date': '2017-01-01T00:00:00.000Z', 'hour': 3, 'impressions': 109217, 'clicks': 139, 'revenue': '496.6397510000000', 'poi_id': 2, 'lat': 43.6426, 'lon': -79.3871, 'poi_name': 'CNTower'},
  {'date': '2017-01-01T00:00:00.000Z', 'hour': 4, 'impressions': 112129, 'clicks': 74, 'revenue': '446.7138830000000', 'poi_id': 4, 'lat': 49.2965, 'lon': -123.0884, 'poi_name': 'VancouverHarbour'},
  {'date': '2017-01-01T00:00:00.000Z', 'hour': 5, 'impressions': 105182, 'clicks': 76, 'revenue': '435.9536840000000', 'poi_id': 3, 'lat': 43.0896, 'lon': -79.0849, 'poi_name': 'Niagara Falls'}
];
