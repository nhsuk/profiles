const notFound = require('../middleware/renderer').notFound;

function setOdsCode(req, res, next) {
  const odsCode = req.params.odsCode;
  if (!odsCode) {
    notFound(req, res);
  } else {
    res.locals.odsCode = odsCode;
    next();
  }
}

module.exports = setOdsCode;
