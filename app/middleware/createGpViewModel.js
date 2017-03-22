const parseOpeningTimes = require('../lib/parseOpeningTimes');
const parseFacilities = require('../lib/parseFacilities');
const gpHelper = require('../lib/gpHelper');

function createGpInfo(gpData) {
  return {
    counts: gpHelper.getGpCountMessages(gpData.gpCounts),
    doctors: gpData.doctors,
  };
}

function getBookOnlineLink(gpData) {
  return gpData.bookingSystem
    ? gpData.bookingSystem.bookOnlineLink
    : undefined;
}

function getGpInfo(gpData) {
  return gpHelper.areGpsAvailable(gpData.gpCounts) ? createGpInfo(gpData) : undefined;
}

function createGpViewModel(req, res, next) {
  const gpData = res.locals.gpData;
  if (gpData) {
    // eslint-disable-next-line no-param-reassign
    res.locals.gp = {
      name: gpData.name,
      address: gpData.address,
      contact: gpData.contact,
      odCode: gpData.odsCode,
      choicesId: gpData.choicesId,
      location: gpData.location,
      facilities: parseFacilities(gpData.facilities),
      gpInfo: getGpInfo(gpData),
      openingTimes: parseOpeningTimes.parseAll(gpData.openingTimes),
      bookOnlineLink: getBookOnlineLink(gpData),
    };
  }
  next();
}

module.exports = createGpViewModel;
