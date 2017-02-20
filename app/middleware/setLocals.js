function fromRequest(req, res, next) {
  const choicesId = req.params.choicesId;

  if (!choicesId) {
    res.render('404');
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
