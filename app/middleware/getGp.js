const esClient = require('../lib/esClient');
const log = require('../lib/logger');

function getGp(req, res, next) {
  const choicesId = res.locals.choicesId;
  esClient.getGp(choicesId).then((gp) => {
    log.debug({ gp }, `Returned when searching for ${choicesId}.`);
    res.locals.gpData = gp;
    next();
  }).catch((err) => {
    log.error({ err }, `Error retrieving gp ID '${choicesId}'.`);
    next(err);
  });
}

module.exports = getGp;
