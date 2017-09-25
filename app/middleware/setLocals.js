function hostNameAndProtocol(req) {
  return `https://${req.hostname}`;
}

function fromRequest(req, res, next) {
  res.locals.hostNameAndProtocol = hostNameAndProtocol(req);
  next();
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
