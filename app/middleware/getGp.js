const esClient = require('../lib/esClient');
const log = require('../lib/logger');

function getGp(req, res, next) {
  const odsCode = req.params.odsCode;
  esClient.getGpByOdsCode(odsCode).then((gp) => {
    log.debug({ gp }, `Returned when searching for ODS code ${odsCode}.`);
    res.locals.gpData = gp;
    next();
  }).catch((err) => {
    log.error({ err }, `Error retrieving ODS code '${odsCode}'.`);
    next(err);
  });
}

module.exports = getGp;
