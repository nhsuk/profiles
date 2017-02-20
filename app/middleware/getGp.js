const MongoClient = require('mongodb').MongoClient;
const co = require('co');
const log = require('../lib/logger');
const config = require('../../config/config').mongodb;

function getGp(req, res, next) {
  const connectionString = config.connectionString;

  co(function* () {
    const db = yield MongoClient.connect(connectionString);
    log.info(`Connected to ${connectionString}`);

    const collection = db.collection(config.collection);

    const choicesId = parseInt(res.locals.choicesId, 10);
    const gp = yield collection.findOne({ choicesId });

    log.debug({ gp }, `Returned when searching for ${choicesId}`);
    // eslint-disable-next-line no-param-reassign
    res.locals.gp = gp;

    db.close();

    next();
  }).catch((err) => {
    log.error(err.stack, `Error connecting to ${connectionString}`);
    next(err);
  });
}

module.exports = getGp;
