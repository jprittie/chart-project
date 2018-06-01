/** getHourlyStatsTable returns the data on state needed to populate the hourly stats table */
export const getHourlyStatsTable = (state) => {
  return state.stats.hourlyStatsTable;
};

/**
  * getStatsChart returns the data on state for hourly and daily stats
  * It then transforms those stats so they can be used in charts
  */
export const getStatsChart = (state, typeOfStatsChart) => {
  const statsResults = state.stats[typeOfStatsChart];
  if (statsResults) {
    var revenuePerImpressionsStats = statsResults.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: (parseInt(dataRow.revenue) / (dataRow.impressions) * 1000)});
    });
    var clickThroughStats = statsResults.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.clicks) / parseInt(dataRow.impressions) * 100});
    });
    var transformedRevenueStats = statsResults.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.revenue)});
    });
    var transformedClicksStats = statsResults.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: dataRow.clicks});
    });
    var transformedImpressionsStats = statsResults.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: dataRow.impressions});
    });
  }
  return {
    revenuePerThousandImpressionByHour: revenuePerImpressionsStats,
    clickThroughRatePerHour: clickThroughStats,
    revenueByHour: transformedRevenueStats,
    clicksByHour: transformedClicksStats,
    impressionsByHour: transformedImpressionsStats
  };
};

/**
  * getHourlyEventsChart returns the data on state for hourly events
  * It then transforms those stats so a day's worth of hourly data can be used in charts
  * TODO Remove hardcoded date and add UI and related redux so user can select
  * which day to view
  */
export const getHourlyEventsChart = (state) => {
  const eventsResults = state.stats.hourlyEventsChart;
  if (eventsResults) {
    var filteredResults = eventsResults.filter(dataRow => dataRow.date === '2017-01-01T00:00:00.000Z');
    var transformedResults = filteredResults.map(dataRow => {
      return {x: dataRow.hour, y: dataRow.events};
    });
  }
  return {
    date: '1/1/2017',
    chartData: transformedResults
  };
};

/**
  * getDailyEventsChart returns the data on state for daily events
  * It then transforms those stats so a day's worth of hourly data can be used in charts
  */
export const getDailyEventsChart = (state) => {
  const eventsResults = state.stats.dailyEventsChart;
  if (eventsResults) {
    var transformedResults = eventsResults.map(dataRow => {
      var msec = Date.parse(dataRow.date);
      var d = new Date(msec);
      return {x: new Date(d), y: parseInt(dataRow.events)};
    });
  }
  return transformedResults;
};

/**
  * getMapData returns the data on state for daily events
  * TODO add UI so user can filter by type of metric and time range, and add filtering in this
  * selector to return a subset of map data when the UI is changed
  */
export const getMapData = (state) => {
  const mapResults = state.stats.heatMap;
  return mapResults;
};
