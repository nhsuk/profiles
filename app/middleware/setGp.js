const gpLookup = require('../lib/gpLookup');

function setGp(req, res, next) {
   /* eslint-disable no-param-reassign*/
  res.locals.gp = gpLookup(res.locals.orgCode);
   /* eslint-enable no-param-reassign*/
  next();
}

module.exports = setGp;
