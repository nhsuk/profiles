const expressPromBundle = require('express-prom-bundle');

const promBundle = expressPromBundle({ includePath: true });

module.exports = {
  middleware: promBundle,
  promClient: promBundle.promClient,
};
