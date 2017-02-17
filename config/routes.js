// eslint-disable-next-line new-cap
const router = require('express').Router();
const renderer = require('../app/middleware/renderer');
const setLocals = require('../app/middleware/setLocals');
const log = require('../app/middleware/logger');
const getGp = require('../app/middleware/getGp');

router.get('/',
  //res.send('Hello World!');
  renderer.siteHome
);

router.get('/:choicesId',
  log.info,
  setLocals.fromRequest,
  getGp,
  renderer.gpSurgeries
);

router.get('/:choicesId/book-appointment',
  log.info,
  setLocals.fromRequest,
  getGp,
  renderer.bookAnAppointment
);

module.exports = router;
