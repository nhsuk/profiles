const notFound = require('../middleware/renderer').notFound;

function setChoicesId(req, res, next) {
  const choicesId = parseInt(req.params.choicesId, 10);
  if (Number.isNaN(choicesId)) {
    notFound(req, res);
  } else {
    res.locals.choicesId = choicesId;
    next();
  }
}

module.exports = setChoicesId;
