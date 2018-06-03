const express = require('express');
const pg = require('pg');

const app = express();
// configs come from standard PostgreSQL env vars
// https://www.postgresql.org/docs/9.6/static/libpq-envars.html

const pool = new pg.Pool();

const redis = require('redis');
const client = redis.createClient('redis://redis:6379');
const mw = require('./rate-limit.js');

// Test redis connection
client.on('connect', function () {
  console.log('connected');
});

client.on('error', function (err) {
  console.log('Error ' + err);
});

const queryHandler = (req, res, next) => {
  pool.query(req.sqlQuery).then((r) => {
    return res.json(r.rows || []);
  }).catch(next);
};

app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎');
});

app.get('/events/hourly', mw.rateLimit(client), (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, events, poi_id
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

/** Default route kept in case client-side developer doesn't want pagination */
app.get('/stats/hourly', (req, res, next) => {
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT 168;
  `;
  return next();
}, queryHandler);

/** New route that offers pagination; take page number and page size parameters */
app.get('/stats/hourly/:page/:page_size', (req, res, next) => {
  let page = req.params.page;
  let limit = req.params.page_size;
  let offset = limit * (page - 1);
  req.sqlQuery = `
    SELECT date, hour, impressions, clicks, revenue, poi_id
    FROM public.hourly_stats
    ORDER BY date, hour
    LIMIT ${limit}
    OFFSET ${offset};
  `;
  return next();
}, queryHandler);

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

/** New route that provides data for mapping events and statistics */
app.get('/mapping', (req, res, next) => {
  req.sqlQuery = `
    SELECT h.date AS date,
           h.hour AS hour,
           h.impressions AS impressions,
           h.clicks AS clicks,
           h.revenue AS revenue,
           p.poi_id AS poi_id,
           p.lat AS lat,
           p.lon AS lon,
           p.name AS poi_name
    FROM public.poi p INNER JOIN public.hourly_stats h ON p.poi_id = h.poi_id
    ORDER BY date, hour
    LIMIT 24
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
