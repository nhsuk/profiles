const elasticsearch = require('elasticsearch');
const esConfig = require('../../config/config').es;
const esGetGpHistogram = require('../lib/promHistograms').esGetGP;

const client = elasticsearch.Client({ host: `${esConfig.host}:${esConfig.port}` });

function getByIdQuery(id) {
  return {
    index: esConfig.index,
    type: 'gps',
    id,
  };
}

function notFound(error) {
  return error.message === 'Not Found';
}

async function getGp(id) {
  let endTimer;
  try {
    endTimer = esGetGpHistogram.startTimer();
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

function getHealth() {
  return client.cat.health({ format: 'json' });
}

module.exports = {
  getGp,
  getHealth,
};
