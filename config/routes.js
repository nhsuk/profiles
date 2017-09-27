// eslint-disable-next-line new-cap
const router = require('express').Router();
const renderer = require('../app/middleware/renderer');
const setLocals = require('../app/middleware/setLocals');
const setChoicesId = require('../app/middleware/setChoicesId');
const setOdsCode = require('../app/middleware/setOdsCode');
const redirectToOdsCode = require('../app/middleware/redirectToOdsCode');
const getGp = require('../app/middleware/getGp');
const createGpViewModel = require('../app/middleware/createGpViewModel');

router.get(
  '/',
  renderer.notFound
);

router.get(
  '/:choicesId(\\d+)',
  setLocals.fromRequest,
  setChoicesId,
  redirectToOdsCode
);

router.get(
  '/:odsCode',
  setLocals.fromRequest,
  setOdsCode,
  getGp,
  createGpViewModel,
  renderer.gpSurgeries
);

module.exports = router;
