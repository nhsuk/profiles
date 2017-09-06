const promClient = require('./promBundle').promClient;
const buckets = require('./constants').promHistogramBuckets;

module.exports = {
  esGetGP: new promClient.Histogram({ name: 'es_get_gp', help: 'get gp from ES', buckets }),
};
