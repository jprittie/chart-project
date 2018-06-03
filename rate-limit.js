/** Middleware for rate limiting an API */

// NB I may just be able to use req.ip
module.exports = {
  rateLimit: function (client) {
    return function (req, res, next) {
      'use strict';
      let ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        // this check is necessary for some clients that set an array of IP addresses
      ip = (ip || '').split(',')[0];

      const countKey = `key:${req.path}&${ip}:count`;
      // check whether key exists yet
      client.get('countKey', function (err, reply) {
        console.log('reply', reply);
        // if key is empty, then set key, with minute expiry
        if (!reply) {
          client.set('countKey', '1', 'EX', 60, function (err, reply) {
            if (err) throw err;
          });
        } else {
          // if key is not empty, then check what it's value is
          if (parseInt(reply) < 5) {
            // if less than five, increment value
            client.incr(countKey, (err, count) => {
              if (err) throw err;
            });
            return next();
          } else if (parseInt(reply) === 5) {
            res.statusCode = 429;
            return res.json({
              errors: [
                {message: 'Rate limit reached. Please wait and try again.'}
              ]
            });
          }
        }
        if (err) throw err;
      });
    };
  }
};
