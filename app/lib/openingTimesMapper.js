const timeUtils = require('./timeUtils');
// const exceptionalTimesMapper = require('./exceptionalTimesMapper');

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function mapDay(day) {
  // empty day field doesn't occur in the source data, added default in case
  // it changes in future
  if (day === undefined) {
    return ['No information available'];
  }

  // eslint-disable-next-line arrow-body-style
  const sessions = timeUtils.joinContiguousTimes(day).map((session) => {
    return `${timeUtils.toAmPm(session.opens)} to ${timeUtils.toAmPm(session.closes)}`;
  });

  if (sessions.length === 0) {
    sessions.push('Closed');
  }
  return sessions;
}

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
    const sessions = mapDay(daySessions);
    parsedTimes.push({ day, sessions });
  });
  return timeUtils.addTimePadding(parsedTimes);
}

// eslint-disable-next-line no-unused-vars
function mapWeekReception(recTimes, excTimes) {
  mapWeek(recTimes);
  // TODO: how do exceptional opening times override reception times
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
  mapWeek,
  mapDay
};
