const log = require('../lib/logger');
const mapLink = require('../lib/mapLink');
const notFoundCounter = require('../lib/promCounters').notFound;

function notFound(req, res) {
  log.warn({ req }, 'Not found (404).');
  notFoundCounter.inc(1);
  res.status(404);
  res.render('404');
}

function gpSurgeries(req, res) {
  if (res.locals.gp) {
    res.render('hub', {
      mapUrl: mapLink.generateUrl(res.locals.gp),
    });
  } else {
    notFound(req, res);
  }
}

module.exports = {
  gpSurgeries,
  notFound,
};
