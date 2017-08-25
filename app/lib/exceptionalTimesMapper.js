const timeUtils = require('./timeUtils');
const openingTimesUtils = require('./openingTimesUtils');

const futureDays = 14;

function getDates(times) {
  const filteredTimes = {};
  const dates = Object.keys(times);

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    if (openingTimesUtils.isDateInWindow(date, timeUtils.getToday(), futureDays)) {
      filteredTimes[date] = times[date];
    }
  }

  return filteredTimes;
}

function mapDates(times) {
  const filteredTimes = Object.keys(getDates(times));

  if (filteredTimes.length > 0) {
    const parsedTimes = [];

    for (let i = 0; i < filteredTimes.length; i++) {
      const filteredTime = filteredTimes[i];
      const formattedDate = openingTimesUtils.toReadableDate(filteredTime);
      const sessions = openingTimesUtils.mapDay(times[filteredTime]);

      parsedTimes.push({ formattedDate, sessions });
    }

    return openingTimesUtils.addMarkupProperties(parsedTimes);
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
