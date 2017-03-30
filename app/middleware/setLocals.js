const notFound = require('../middleware/renderer').notFound;

function fromRequest(req, res, next) {
  const choicesId = parseInt(req.params.choicesId, 10);

  if (isNaN(choicesId)) {
    notFound(req, res);
  } else {
    /* eslint-disable no-param-reassign */
    res.locals.choicesId = choicesId;
    /* eslint-enable no-param-reassign */
    next();
  }
}

function backLink(req, res, next) {
  /* eslint-disable no-script-url */
  /* eslint-disable no-param-reassign */
  res.locals.backLink = req.get('referer') || 'javascript:history.back();';
  next();
}

module.exports = {
  fromRequest,
  backLink,
};
