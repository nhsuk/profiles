const parseOpeningTimes = require('../lib/parseOpeningTimes');
const gpCountsHelper = require('../lib/gpCountsHelper');

function createGpInfo(gpData) {
  return {
    counts: gpCountsHelper.getGpCountMessages(gpData.gpCounts),
    doctors: gpData.doctors,
  };
}

function createGpViewModel(req, res, next) {
  const gpData = res.locals.gpData;
  if (gpData) {
    const gpInfo = gpCountsHelper.gpsAvailable(gpData.gpCounts) ? createGpInfo(gpData) : undefined;
    const openingTimes = parseOpeningTimes.parseAll(gpData.openingTimes);
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
    };
  }
  next();
}

module.exports = createGpViewModel;
