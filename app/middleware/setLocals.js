const notFound = require('../middleware/renderer').notFound;

function hostNameAndProtocol(req) {
  return `https://${req.hostname}`;
}

function fromRequest(req, res, next) {
  const choicesId = parseInt(req.params.choicesId, 10);

  if (Number.isNaN(choicesId)) {
    notFound(req, res);
  } else {
    res.locals.choicesId = choicesId;
    res.locals.hostNameAndProtocol = hostNameAndProtocol(req);
    next();
  }
}

function backLink(req, res, next) {
  /* eslint-disable no-script-url */
  res.locals.backLink = req.get('referer') || 'javascript:history.back();';
  next();
}

module.exports = {
  fromRequest,
  backLink,
};
