export const getHourlyTableStats = (state) => {
  return state.hourlyStats.tableResults;
};

export const getHourlyChartStats = (state) => {
  const hourlyStats = state.hourlyStats.tableResults;
  console.log(hourlyStats);
  if (hourlyStats) {
    var transformedStats = hourlyStats.map(dataRow => {
      return Object.assign({}, {x: dataRow.hour, y: parseInt(dataRow.revenue)});
    });
    console.log(transformedStats);
  }
  return transformedStats;
};
