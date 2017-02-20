const log = require('../lib/logger');

function notFound(req, res, msg) {
  log.warn(msg, 'Not found (404)');
  res.status(404);
  res.render('404');
}

function gpSurgeries(req, res) {
  if (res.locals.gp) {
    res.render('hub');
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
