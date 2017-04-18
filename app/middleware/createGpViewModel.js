const openingTimesMapper = require('../lib/openingTimesMapper').mapAll;
const facilitiesMapper = require('../lib/facilitiesMapper');
const gpHelper = require('../lib/gpHelper');
const servicesMapper = require('../lib/servicesMapper');
const contactsMapper = require('../lib/contactsMapper');

function getGpInfo(gpData) {
  return gpHelper.areGpsAvailable(gpData.gpCounts)
    ? {
      personSingular: gpHelper.getPersonSingular(gpData.gpCounts),
      counts: gpHelper.getGpCountMessages(gpData.gpCounts),
      doctors: gpData.doctors,
    }
    : undefined;
}

function getBookOnlineLink(gpData) {
  return gpData.bookingSystem
    ? gpData.bookingSystem.bookOnlineLink
    : undefined;
}

function getOldProfileLink(gpData) {
  // eslint-disable-next-line no-underscore-dangle
  return `http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=${gpData._id}`;
}

function createGpViewModel(req, res, next) {
  const gpData = res.locals.gpData;
  if (gpData) {
    // eslint-disable-next-line no-param-reassign
    res.locals.gp = {
      name: gpData.name,
      address: gpData.address,
      contact: contactsMapper(gpData.contact),
      odsCode: gpData.odsCode,
      choicesId: gpData.choicesId,
      location: gpData.location,
      acceptingNewPatients: gpData.acceptingNewPatients,
      facilities: facilitiesMapper(gpData.facilities),
      services: servicesMapper(gpData.services),
      openingTimes: openingTimesMapper(gpData.openingTimes),
      gpInfo: getGpInfo(gpData),
      bookOnlineLink: getBookOnlineLink(gpData),
      oldProfileLink: getOldProfileLink(gpData),
    };
  }
  next();
}

module.exports = createGpViewModel;
