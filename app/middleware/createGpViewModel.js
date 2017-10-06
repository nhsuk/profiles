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
const liveServiceHostname = require('../../config/config').liveServiceHostname;

function getGpInfo(gpData) {
  return gpHelper.areGpsAvailable(gpData.gpCounts)
    ? {
      personSingular: gpHelper.getPersonSingular(gpData.gpCounts),
      counts: gpHelper.getGpCountMessages(gpData.gpCounts),
      doctors: gpData.doctors,
    }
    : undefined;
}

function getChoicesProfileLink(gpData) {
  return `http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=${gpData.choicesId}`;
}

function getChoicesEditLink(gpData) {
  return `https://${liveServiceHostname}/Personalisation/Login.aspx?ReturnUrl=/Services/GP/Overview/DefaultView.aspx?id=${gpData.choicesId}`;
}

function getChoicesLeaveReviewLink(gpData) {
  return `https://www.nhs.uk/Services/GP/LeaveReview/DefaultView.aspx?id=${gpData.choicesId}`;
}

function getChoicesReviewsLink(gpData) {
  return `http://www.nhs.uk/Services/GP/ReviewsAndRatings/DefaultView.aspx?id=${gpData.choicesId}`;
}

function getPatientSurveyLink(gpData) {
  return `https://gp-patient.co.uk/report?practicecode=${gpData.odsCode}`;
}

function createGpViewModel(req, res, next) {
  const gpData = res.locals.gpData;

  if (gpData) {
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
      choicesProfileLink: getChoicesProfileLink(gpData),
      choicesLeaveReviewLink: getChoicesLeaveReviewLink(gpData),
      choicesReviewsLink: getChoicesReviewsLink(gpData),
      choicesEditLink: getChoicesEditLink(gpData),
      patientSurveyLink: getPatientSurveyLink(gpData),
    };
  }
  next();
}

module.exports = createGpViewModel;
