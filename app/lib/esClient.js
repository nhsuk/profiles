const elasticsearch = require('elasticsearch');
const esConfig = require('../../config/config').es;

const client = elasticsearch.Client({ host: `${esConfig.host}:${esConfig.port}` });
function getByIdQuery(id) {
  return {
    index: 'profiles',
    type: 'gps',
    id,
  };
}

function notFound(error) {
  return error.message === 'Not Found';
}

function getGp(id) {
  return new Promise((resolve, reject) => {
    client.get(getByIdQuery(id), (error, result) => {
      if (!error) {
        // eslint-disable-next-line no-underscore-dangle
        resolve(result._source);
      } else {
        // eslint-disable-next-line no-unused-expressions
        notFound(error) ? resolve(undefined) : reject(error);
      }
    });
  });
}

module.exports = {
  getGp,
};
