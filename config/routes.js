// eslint-disable-next-line new-cap
const router = require('express').Router();
const renderer = require('../app/middleware/renderer');
const setLocals = require('../app/middleware/setLocals');
const log = require('../app/middleware/logger');
const getGp = require('../app/middleware/getGp');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/:orgCode',
  log.info,
  setLocals.fromRequest,
  getGp,
  renderer.gpSurgeries
);

router.get('/:orgCode/book-appointment',
  log.info,
  setLocals.fromRequest,
  getGp,
  renderer.bookAnAppointment
);

module.exports = router;
