/**
  * This module contains middleware for rate limiting an API
  * First we get the IP from the req object, and check whether client set an array of IP addresses
  * Then we create a countKey, which combines the IP and the path
  * We check whether the key exists in Redis; if it doesn't, we set it with a minute expiry
  * If the key does exist, and its value is less than five, we increment value and return next()
  * If the five hits per minute limit has been reached, we send a message with status code 429
  * saying the limit was hit
*/

module.exports = {
  rateLimit: function (client) {
    return function (req, res, next) {
      'use strict';
      let ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
      ip = (ip || '').split(',')[0];

      const countKey = `${req.path}&${ip}`;

      client.get(countKey, function (err, reply) {
        if (err) throw err;

        if (!reply) {
          client.set(countKey, 1);
          client.expire(countKey, 60);
        } else {
          if (parseInt(reply) < 5) {
            client.incr(countKey, (err, reply) => {
              if (err) throw err;
            });
            return next();
          } else if (parseInt(reply) >= 5) {
            res.statusCode = 429;
            return res.json({
              errors: [
                {message: 'Rate limit reached. Please wait and try again.'}
              ]
            });
          }
        }
      });
    };
  }
};
