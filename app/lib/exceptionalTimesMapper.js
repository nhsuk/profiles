const timeUtils = require('./timeUtils');
const cTimeUtils = require('./continuousTimeUtils');

const futureDays = 14;

function getDates(times) {
  const filteredTimes = {};
  Object.keys(times).forEach((exceptionalTime) => {
    if (cTimeUtils.isDateInWindow(exceptionalTime, timeUtils.getToday(), futureDays) === true) {
      filteredTimes[exceptionalTime] = times[exceptionalTime];
    }
  });
  return filteredTimes;
}

function mapDates(times) {
  const filteredTimes = Object.keys(getDates(times));

  if (filteredTimes.length > 0) {
    const parsedTimes = [];
    filteredTimes.forEach((date) => {
      const formattedDate = cTimeUtils.toReadableDate(date);
      const sessions = cTimeUtils.mapKey(times[date]);
      parsedTimes.push({ formattedDate, sessions });
    });
    return cTimeUtils.addTimePadding(parsedTimes);
  }
  return undefined;
}

function timesValid(allTimes) {
  // the source data may not have alterations even if opening times exist
  return allTimes && allTimes.alterations;
}

function mapAll(allTimes) {
  return timesValid(allTimes) ? {
    alterations: mapDates(allTimes.alterations),
  } : undefined;
}

module.exports = {
  mapAll,
  mapDates
};
