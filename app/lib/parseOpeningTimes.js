const timeUtils = require('./timeUtils');

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function parseDay(day) {
  // empty day field doesn't occur in the source data, added default in case
  // it changes in future
  if (day === undefined) {
    return ['No information available'];
  }
  // eslint-disable-next-line arrow-body-style
  const sessions = day.map((session) => {
    return `${timeUtils.toAmPm(session.opens)} to ${timeUtils.toAmPm(session.closes)}`;
  });
  if (sessions.length === 0) {
    sessions.push('Closed');
  }
  return sessions;
}

function parseTimes(times) {
  const parsedTimes = [];

  daysOfWeek.forEach((day) => {
    const daySessions = times[day.toLowerCase()];
    const sessions = parseDay(daySessions);
    parsedTimes.push({ day, sessions });
  });

  return parsedTimes;
}

function parseAll(allTimes) {
  if (!allTimes) {
    return undefined;
  }
  return {
    reception: allTimes.reception && parseTimes(allTimes.reception),
    surgery: allTimes.surgery && parseTimes(allTimes.surgery),
  };
}

module.exports = { parseAll, parseDay };
