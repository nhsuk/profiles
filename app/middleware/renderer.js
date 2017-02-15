function siteHome(req, res) {
  res.render('home');
}

function gpSurgeries(req, res) {
  if (res.locals.gp) {
    res.render('gp-surgeries');
  } else {
    res.status(404);
    res.render('error-404');
  }
}

function bookAnAppointment(req, res) {
  res.render('book-an-appointment');
}

module.exports = {
  siteHome,
  gpSurgeries,
  bookAnAppointment
};
