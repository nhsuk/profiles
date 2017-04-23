const openingTimesMapper = require('../lib/openingTimesMapper').mapAll;
const facilitiesMapper = require('../lib/facilitiesMapper');
const gpHelper = require('../lib/gpHelper');
const servicesMapper = require('../lib/servicesMapper');
const contactsMapper = require('../lib/contactsMapper');
const onlineTasksMapper = require('../lib/onlineTasksMapper');

function getGpInfo(gpData) {
  return gpHelper.areGpsAvailable(gpData.gpCounts)
    ? {
      personSingular: gpHelper.getPersonSingular(gpData.gpCounts),
      counts: gpHelper.getGpCountMessages(gpData.gpCounts),
      doctors: gpData.doctors,
    }
    : undefined;
}

function choicesProfileLink(gpData) {
  return `http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=${gpData.choicesId}`;
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
      onlineTasks: onlineTasksMapper(gpData),
      choicesProfileLink: choicesProfileLink(gpData),
    };
  }
  next();
}

module.exports = createGpViewModel;
