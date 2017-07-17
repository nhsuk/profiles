// eslint-disable-next-line new-cap
const router = require('express').Router();
const renderer = require('../app/middleware/renderer');
const setLocals = require('../app/middleware/setLocals');
const getGp = require('../app/middleware/getGp');
const createGpViewModel = require('../app/middleware/createGpViewModel');

router.get('/',
  renderer.notFound
);

router.get('/:choicesId',
  setLocals.fromRequest,
  getGp,
  createGpViewModel,
  renderer.gpSurgeries
);

module.exports = router;
