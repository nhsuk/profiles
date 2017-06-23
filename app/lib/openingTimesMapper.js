const openingTimesUtils = require('./openingTimesUtils');
const daysOrderedForUi = require('./constants').daysOfWeekOrderedForUi;

function isOpen(times) {
  return daysOrderedForUi.some((day) => {
    const daySessions = times[day.toLowerCase()];

    return daySessions && daySessions.length > 0;
  });
}

function mapWeek(times) {
  if (isOpen(times) === false) {
    return undefined;
  }
  const parsedTimes = [];

  daysOrderedForUi.forEach((day) => {
    const daySessions = times[day.toLowerCase()];
    const sessions = openingTimesUtils.mapDay(daySessions);

    parsedTimes.push({ day, sessions });
  });

  return openingTimesUtils.addMarkupProperties(parsedTimes);
}

function timesValid(allTimes) {
  // the source data always has both reception and surgery populated
  // if opening times exist
  return allTimes && allTimes.reception && allTimes.surgery;
}

function mapAll(allTimes) {
  return timesValid(allTimes) ? {
    reception: mapWeek(allTimes.reception),
    surgery: mapWeek(allTimes.surgery),
  } : {};
}

module.exports = {
  mapAll,
  mapWeek
};
