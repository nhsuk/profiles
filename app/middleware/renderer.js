function siteHome(req, res) {
  res.render('home');
}

function gpSurgeries(req, res) {
  res.render('gp-surgeries');
}

function bookAnAppointment(req, res) {
  res.render('book-an-appointment');
}

module.exports = {
  siteHome,
  gpSurgeries,
  bookAnAppointment
};
