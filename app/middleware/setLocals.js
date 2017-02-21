const notFound = require('../middleware/renderer').notFound;

function fromRequest(req, res, next) {
  const choicesId = parseInt(req.params.choicesId, 10);

  if (isNaN(choicesId)) {
    notFound(req, res, `'${req.params.choicesId}'`);
  } else {
    /* eslint-disable no-param-reassign */
    res.locals.choicesId = choicesId;
    /* eslint-enable no-param-reassign */
    next();
  }
}

module.exports = {
  fromRequest,
};
