function siteHome(req, res) {
  res.render('home');
}

function gpSurgeries(req, res) {
  if (res.locals.gp) {
    res.render('hub');
  } else {
    res.status(404);
    res.render('404');
  }
}

function bookAnAppointment(req, res) {
  res.render('book-appointment');
}

module.exports = {
  siteHome,
  gpSurgeries,
  bookAnAppointment
};
