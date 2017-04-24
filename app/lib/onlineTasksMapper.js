function hasOnlineServices(gpData) {
  return gpData.bookingSystem ||
    (gpData.onlineServices && gpData.onlineServices.repeatPrescriptions);
}

function createOnlineTasks(gpData) {
  const onlineTasks = {};

  if (gpData.bookingSystem) {
    onlineTasks.bookOnlineLink = gpData.bookingSystem.bookOnlineLink;
  }

  if (gpData.onlineServices) {
    onlineTasks.repeatPrescriptionOnlineLink = gpData.onlineServices.repeatPrescriptions.url;
  }

  return onlineTasks;
}

function map(gpData) {
  return hasOnlineServices(gpData) ? createOnlineTasks(gpData) : undefined;
}

module.exports = map;
