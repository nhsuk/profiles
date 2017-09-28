const esClient = require('../lib/esClient');
const log = require('../lib/logger');
const notFound = require('../middleware/renderer').notFound;

function getGp(req, res, next) {
  const choicesId = req.params.choicesId;
  esClient.getGpByChoicesId(choicesId).then((gp) => {
    if (gp) {
      log.debug({ gp }, `Returned when searching for Choices ID ${choicesId}.`);
      res.redirect(301, `${gp.odsCode}`);
    } else {
      notFound(req, res);
    }
  }).catch((err) => {
    log.error({ err }, `Error retrieving Choices ID '${choicesId}'.`);
    next(err);
  });
}

module.exports = getGp;
