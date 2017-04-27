function hasOnlineServices(gpData) {
  return gpData.onlineServices;
}

function getLink(onlineServices, key) {
  return onlineServices[key] ? onlineServices[key].url : undefined;
}

function createOnlineTasks(onlineServices) {
  return {
    bookOnlineLink: getLink(onlineServices, 'appointments'),
    repeatPrescriptionOnlineLink: getLink(onlineServices, 'repeatPrescriptions'),
    codedRecordsOnlineLink: getLink(onlineServices, 'codedRecords'),
  };
}

function map(gpData) {
  return hasOnlineServices(gpData) ? createOnlineTasks(gpData.onlineServices) : undefined;
}

module.exports = map;
