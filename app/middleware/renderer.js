const log = require('../lib/logger');
const viewLogic = require('../lib/viewLogic');
const mapLink = require('../lib/mapLink');

function notFound(req, res, msg) {
  log.warn(msg, 'Not found (404)');
  res.status(404);
  res.render('404');
}

function gpSurgeries(req, res) {
  if (res.locals.gp) {
    res.render('hub', {
      getGpCountMessages: viewLogic.getGpCountMessages,
      gpsAvailable: viewLogic.gpsAvailable,
      mapUrl: mapLink.addUrl(res.locals.gp),
    });
  } else {
    notFound(req, res);
  }
}

function bookAnAppointment(req, res) {
  res.render('book-appointment');
}

module.exports = {
  bookAnAppointment,
  gpSurgeries,
  notFound
};
