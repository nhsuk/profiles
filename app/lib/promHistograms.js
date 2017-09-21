const promClient = require('./promBundle').promClient;
const buckets = require('./constants').promHistogramBuckets;

module.exports = {
  esGetGP: new promClient.Histogram({ name: 'es_get_gp', help: 'Duration histogram of Elasticsearch request to get a GP', buckets }),
  esGetGPByOdsCode: new promClient.Histogram({ name: 'es_get_gp_by_ods_code', help: 'Duration histogram of Elasticsearch request to get a GP by ODS code', buckets }),
};
