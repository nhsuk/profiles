function hasOnlineServices(gpData) {
  return gpData.bookingSystem || gpData.onlineServices;
}

function createOnlineTasks(gpData) {
  const onlineTasks = {};

  if (gpData.bookingSystem) {
    onlineTasks.bookOnlineLink = gpData.bookingSystem.bookOnlineLink;
  }

  const onlineServices = gpData.onlineServices;
  if (onlineServices) {
    if (onlineServices.repeatPrescriptions) {
      onlineTasks.repeatPrescriptionOnlineLink = onlineServices.repeatPrescriptions.url;
    }
    if (onlineServices.codedRecords) {
      onlineTasks.codedRecordsOnlineLink = gpData.onlineServices.codedRecords.url;
    }
  }

  return onlineTasks;
}

function map(gpData) {
  return hasOnlineServices(gpData) ? createOnlineTasks(gpData) : undefined;
}

module.exports = map;
