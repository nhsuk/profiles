const parseOpeningTimes = require('../lib/parseOpeningTimes');
const gpHelper = require('../lib/gpHelper');

function createGpInfo(gpData) {
  return {
    counts: gpHelper.getGpCountMessages(gpData.gpCounts),
    doctors: gpData.doctors,
  };
}

function createGpViewModel(req, res, next) {
  const gpData = res.locals.gpData;
  if (gpData) {
    const gpInfo = gpHelper.areGpsAvailable(gpData.gpCounts) ? createGpInfo(gpData) : undefined;
    const openingTimes = parseOpeningTimes.parseAll(gpData.openingTimes);
    const bookOnlineLink = gpHelper.getBookOnlineLink(gpData);
    // eslint-disable-next-line no-param-reassign
    res.locals.gp = {
      name: gpData.name,
      address: gpData.address,
      contact: gpData.contact,
      odCode: gpData.odsCode,
      choicesId: gpData.choicesId,
      location: gpData.location,
      gpInfo,
      openingTimes,
      bookOnlineLink,
    };
  }
  next();
}

module.exports = createGpViewModel;
