
function fromRequest(req, res, next) {
  /* eslint-disable no-param-reassign */
  res.locals.orgCode = req.params.orgCode;
  /* eslint-enable no-param-reassign */
  next();
}

module.exports = {
  fromRequest,
};
