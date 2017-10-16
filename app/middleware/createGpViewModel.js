const openingTimesMapper = require('../lib/openingTimesMapper').mapAll;
const openGraphOpeningTimesMapper = require('../lib/openGraphOpeningTimesMapper').map;
const schemaOrgOpeningTimesMapper = require('../lib/schemaOrgOpeningTimesMapper').map;
const exceptionalTimesMapper = require('../lib/exceptionalTimesMapper').mapAll;
const facilitiesMapper = require('../lib/facilitiesMapper');
const gpHelper = require('../lib/gpHelper');
const servicesMapper = require('../lib/servicesMapper');
const contactsMapper = require('../lib/contactsMapper');
const onlineTasksMapper = require('../lib/onlineTasksMapper');
const addressMapper = require('../lib/addressMapper');
const choicesLinks = require('../lib/choicesLinks');

function getGpInfo(gpData) {
  return gpHelper.areGpsAvailable(gpData.gpCounts)
    ? {
      personSingular: gpHelper.getPersonSingular(gpData.gpCounts),
      counts: gpHelper.getGpCountMessages(gpData.gpCounts),
      doctors: gpData.doctors,
    }
    : undefined;
}

function createGpViewModel(req, res, next) {
  const gpData = res.locals.gpData;

  if (gpData) {
    const links = choicesLinks(gpData);
    res.locals.gp = {
      name: gpData.name,
      address: addressMapper(gpData.address),
      contact: contactsMapper(gpData.contact),
      odsCode: gpData.odsCode,
      choicesId: gpData.choicesId,
      location: gpData.location,
      acceptingNewPatients: gpData.acceptingNewPatients,
      facilities: facilitiesMapper(gpData.facilities),
      services: servicesMapper(gpData.services),
      openingTimes: openingTimesMapper(gpData.openingTimes),
      openGraphOpeningTimes: openGraphOpeningTimesMapper(gpData.openingTimes),
      schemaOrgOpeningTimes: schemaOrgOpeningTimesMapper(gpData.openingTimes),
      exceptionalTimes: exceptionalTimesMapper(gpData.openingTimes),
      gpInfo: getGpInfo(gpData),
      onlineTasks: onlineTasksMapper(gpData),
      choicesProfileLink: links.choicesProfile,
      choicesLeaveReviewLink: links.choicesLeaveReview,
      choicesReviewsLink: links.choicesReviews,
      choicesLoginLink: links.choicesLogin,
      patientSurveyLink: links.patientSurvey
    };
  }
  next();
}

module.exports = createGpViewModel;
