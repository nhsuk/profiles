const esClient = require('../lib/esClient');
const log = require('../lib/logger');

function getEndpoint(res) {
  if (res.locals.choicesId) {
    return esClient.getGpByChoicesId(res.locals.choicesId);
  }
  return esClient.getGpByOdsCode(res.locals.odsCode);
}

function getId(res) {
  return res.locals.choicesId || res.locals.odsCode;
}

function getGp(req, res, next) {
  getEndpoint(res).then((gp) => {
    log.debug({ gp }, `Returned when searching for ${getId(res)}.`);
    res.locals.gpData = gp;
    next();
  }).catch((err) => {
    log.error({ err }, `Error retrieving gp ID '${getId(res)}'.`);
    next(err);
  });
}

module.exports = getGp;
