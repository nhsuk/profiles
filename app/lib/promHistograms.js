const promClient = require('./promBundle').promClient;

module.exports = {
  esGetGP: new promClient.Histogram({ name: 'es_get_gp', help: 'get gp from ES', buckets: [0.10, 5, 15, 50, 100, 500] }),
};
