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

// don't hardcode date - will have to be user selected
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

// I will filter by time range here (what is default?) and then by user selected category in the component
export const getMapData = (state) => {
  const mapResults = state.stats.heatMap;
  return mapResults;
};

// export const getSelectedMapMetrics = (state) => {
//   const mapCategory = state.stats.heatMap.selectedMetrics.category;
//   return mapCategory;
// };
