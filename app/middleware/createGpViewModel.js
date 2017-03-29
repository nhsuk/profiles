const parseOpeningTimes = require('../lib/parseOpeningTimes');
const parseFacilities = require('../lib/parseFacilities');
const gpHelper = require('../lib/gpHelper');
const servicesMapper = require('../lib/servicesMapper');

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

function createGpViewModel(req, res, next) {
  const gpData = res.locals.gpData;
  if (gpData) {
    const gpInfo = gpHelper.areGpsAvailable(gpData.gpCounts) ? createGpInfo(gpData) : undefined;
    const openingTimes = parseOpeningTimes.parseAll(gpData.openingTimes);
    // eslint-disable-next-line no-param-reassign
    res.locals.gp = {
      name: gpData.name,
      address: gpData.address,
      contact: gpData.contact,
      odsCode: gpData.odsCode,
      choicesId: gpData.choicesId,
      location: gpData.location,
      facilities: parseFacilities(gpData.facilities),
      services: servicesMapper(gpData.services),
      gpInfo,
      openingTimes,
      bookOnlineLink: getBookOnlineLink(gpData),
    };
  }
  next();
}

module.exports = createGpViewModel;
