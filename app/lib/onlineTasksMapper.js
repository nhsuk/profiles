function map(gpData) {
  let onlineTasks;

  if (gpData.bookingSystem) {
    onlineTasks = {};
    onlineTasks.bookOnlineLink = gpData.bookingSystem.bookOnlineLink;
  }

  if (gpData.onlineServices && gpData.onlineServices.repeatPrescriptions) {
    onlineTasks = onlineTasks || {};
    onlineTasks.repeatPrescriptionOnlineLink = gpData.onlineServices.repeatPrescriptions.url;
  }

  return onlineTasks;
}

module.exports = map;
