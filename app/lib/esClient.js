const elasticsearch = require('elasticsearch');

const esConfig = require('../../config/config').es;
const esGetGpHistogram = require('../lib/promHistograms').esGetGP;
const esGetGpHistogramOdsCode = require('../lib/promHistograms').esGetGPByOdsCode;
const log = require('../lib/logger');

const client = elasticsearch.Client({ host: `${esConfig.host}:${esConfig.port}` });
const type = 'gps';

function getByIdQuery(id) {
  return {
    index: esConfig.index,
    type,
    id,
  };
}

function getSearchQuery(odsCode) {
  return {
    index: esConfig.index,
    type,
    body: {
      query: {
        constant_score: {
          filter: { term: { odsCode } }
        }
      }
    }
  };
}

function notFound(error) {
  return error.message === 'Not Found';
}

async function getGpByChoicesId(id) {
  const endTimer = esGetGpHistogram.startTimer();
  try {
    const result = await client.get(getByIdQuery(id));
    // eslint-disable-next-line no-underscore-dangle
    return result._source;
  } catch (error) {
    if (notFound(error)) {
      return undefined;
    }
    throw error;
  } finally {
    endTimer();
  }
}

function getHitsResult(result, code) {
  const hits = result.hits && result.hits.hits;
  if (hits.length > 1) {
    log.warn({ hits }, `Warning multiple records returned for ${code}, expecting only one`);
  }
  // eslint-disable-next-line no-underscore-dangle
  return hits.length > 0 ? hits[0]._source : undefined;
}

async function getGpByOdsCode(odsCode) {
  const endTimer = esGetGpHistogramOdsCode.startTimer();
  const result = await client.search(getSearchQuery(odsCode));
  endTimer();
  return getHitsResult(result);
}

function getHealth() {
  return client.cat.health({ format: 'json' });
}

module.exports = {
  getGpByChoicesId,
  getGpByOdsCode,
  getHealth,
};
