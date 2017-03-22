const log = require('../lib/logger');
const mapLink = require('../lib/mapLink');
const mobileDetect = require('../lib/mobileDetect');

function notFound(req, res, msg) {
  log.warn(msg, 'Not found (404)');
  res.status(404);
  res.render('404');
}

function gpSurgeries(req, res) {
  if (res.locals.gp) {
    res.render('hub', {
      mapUrl: mapLink.generateUrl(res.locals.gp),
      isMoble: mobileDetect.mobilecheck(req.headers['user-agent']),
    });
  } else {
    notFound(req, res);
  }
}

module.exports = {
  gpSurgeries,
  notFound
};
