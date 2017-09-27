const esClient = require('../lib/esClient');
const log = require('../lib/logger');

function getGp(req, res, next) {
  esClient.getGpByOdsCode(res.locals.odsCode).then((gp) => {
    log.debug({ gp }, `Returned when searching for ${res.locals.odsCode}.`);
    res.locals.gpData = gp;
    next();
  }).catch((err) => {
    log.error({ err }, `Error retrieving gp ID '${res.locals.odsCode}'.`);
    next(err);
  });
}

module.exports = getGp;
