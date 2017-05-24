const continuousTimeUtils = require('./continuousTimeUtils');

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function isOpen(times) {
  return daysOfWeek.some((day) => {
    const daySessions = times[day.toLowerCase()];
    return daySessions && daySessions.length > 0;
  });
}

function mapWeek(times) {
  if (isOpen(times) === false) {
    return undefined;
  }
  const parsedTimes = [];

  daysOfWeek.forEach((day) => {
    const daySessions = times[day.toLowerCase()];
    const sessions = continuousTimeUtils.mapKey(daySessions);
    parsedTimes.push({ day, sessions });
  });
  return continuousTimeUtils.addTimePadding(parsedTimes);
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
