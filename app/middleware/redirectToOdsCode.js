const esClient = require('../lib/esClient');
const log = require('../lib/logger');
const notFound = require('../middleware/renderer').notFound;

function getGp(req, res, next) {
  esClient.getGpByChoicesId(res.locals.choicesId).then((gp) => {
    if (gp) {
      log.debug({ gp }, `Returned when searching for ${res.locals.choicesId}.`);
      res.redirect(301, `${gp.odsCode}`);
    } else {
      notFound(req, res);
    }
  }).catch((err) => {
    log.error({ err }, `Error retrieving gp ID '${res.locals.choicesId}'.`);
    next(err);
  });
}

module.exports = getGp;
