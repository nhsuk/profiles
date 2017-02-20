const MongoClient = require('mongodb').MongoClient;
const log = require('../lib/logger');
const config = require('../../config/config').mongodb;

function getGp(req, res, next) {
  const connectionString = config.connectionString;

  MongoClient.connect(connectionString).then((db) => {
    log.info(`Connected to ${connectionString}`);

    const collection = db.collection(config.collection);

    const choicesId = res.locals.choicesId;

    collection.findOne({ choicesId }).then((gp) => {
      log.debug({ gp }, `Returned when searching for ${choicesId}`);
      // eslint-disable-next-line no-param-reassign
      res.locals.gp = gp;

      db.close();

      next();
    });
  }).catch((err) => {
    log.error(err.stack, `Error connecting to ${connectionString}`);
    next(err);
  });
}

module.exports = getGp;
