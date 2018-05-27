const express = require('express');
const pg = require('pg');

const app = express();
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html
const pool = new pg.Pool();

const queryHandler = (req, res, next) => {
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || []);
  }).catch(next);
};

app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎');
});

app.get('/events/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events
    FROM public.hourly_events
    ORDER BY date, hour
    LIMIT 168;
  `;
  return next();
}, queryHandler);

app.get('/events/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, SUM(events) AS events
    FROM public.hourly_events
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `;
  return next();
}, queryHandler);

app.get('/stats/hourly/resultsCount', (req, res, next) => {
  req.sqlQuery = `
    SELECT COUNT(*)
    FROM public.hourly_stats;
  `;
  return next();
}, queryHandler);

// rate limiting
// create a Map with req.ip
// add each request to array when it comes in
// use this to limit how often you call return next();
// I can throttle how often I call return next()
// but to do this in a series I have to know when the database query has returned

// allow user to pass page and page_size as query params
// I could still use limit and offset for the sql query, but I should not expect the client-side
// developer to calculate what the offset is
// a client-side developer might not need to know how many records there are, but they would need
// to know how many pages of data there are for a certain page size
// how can I alter queryHandler so that I can also send back the page count?
// I have read that offset can cause a problem with big datasets
// also note that SELECT COUNT(*) can be slow
// and I do not want to count all the rows every time client side changes the page
// client-side caching; use node cache? but wouldn't I just put results from previous queries
// in the redux store?
app.get('/stats/hourly/:page/:page_size', (req, res, next) => {
  let page = req.params.page;
  let limit = req.params.page_size;
  // let pages = Math.ceil(resultsCount / limit);
  let offset = limit * (page - 1);
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT ${limit}
    OFFSET ${offset};
  `;
  return next();
}, queryHandler);

// default route - make this return fixed pages?
// app.get('/stats/hourly', (req, res, next) => {
//   req.sqlQuery = `
//     SELECT date, hour, impressions, clicks, revenue
//     FROM public.hourly_stats
//     ORDER BY date, hour
//     LIMIT 168;
//   `;
//   return next();
// }, queryHandler);

app.get('/stats/daily', (req, res, next) => {
  req.sqlQuery = `
    SELECT date,
        SUM(impressions) AS impressions,
        SUM(clicks) AS clicks,
        SUM(revenue) AS revenue
    FROM public.hourly_stats
    GROUP BY date
    ORDER BY date
    LIMIT 7;
  `;
  return next();
}, queryHandler);

app.get('/poi', (req, res, next) => {
  req.sqlQuery = `
    SELECT *
    FROM public.poi;
  `;
  return next();
}, queryHandler);

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`);
  }
});

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit(1);
});
