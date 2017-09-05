const expressPromBundle = require('express-prom-bundle');

const promBundle = expressPromBundle({ includeMethod: true });

module.exports = {
  middleware: promBundle,
  promClient: promBundle.promClient,
};
