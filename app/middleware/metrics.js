const promBundle = require('express-prom-bundle');

const metrics = promBundle({ includeMethod: true });

module.exports = metrics;
