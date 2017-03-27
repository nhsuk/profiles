const timeUtils = require('./timeUtils');

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function joinContiguousTimes(day) {
  const fixedDays = day.reduce((o, session) => {
    /* eslint-disable no-param-reassign */
    if (o.prev && session.opens === o.prev.closes) {
      o.prev.closes = session.closes;
    } else {
      o.list.push(session);
      o.prev = session;
    }
    /* eslint-enable no-param-reassign */
    return o;
  }, { list: [], prev: undefined });

  return fixedDays.list;
}

function parseDay(day) {
  // empty day field doesn't occur in the source data, added default in case
  // it changes in future
  if (day === undefined) {
    return ['No information available'];
  }

  // eslint-disable-next-line arrow-body-style
  const sessions = joinContiguousTimes(day).map((session) => {
    return `${timeUtils.toAmPm(session.opens)} to ${timeUtils.toAmPm(session.closes)}`;
  });

  if (sessions.length === 0) {
    sessions.push('Closed');
  }
  return sessions;
}

function addPadding(parsedTimes) {
  const counts = parsedTimes.map(time => time.sessions.length);
  const max = Math.max(...counts);

  parsedTimes.forEach((time) => {
    if (time.sessions.length < max) {
      // eslint-disable-next-line no-param-reassign
      time.padding = (max - time.sessions.length);
    }
  });

  return parsedTimes;
}

function isOpen(times) {
  return daysOfWeek.some((day) => {
    const daySessions = times[day.toLowerCase()];
    return daySessions && daySessions.length > 0;
  });
}

function parseWeek(times) {
  if (isOpen(times) === false) {
    return undefined;
  }
  const parsedTimes = [];

  daysOfWeek.forEach((day) => {
    const daySessions = times[day.toLowerCase()];
    const sessions = parseDay(daySessions);
    parsedTimes.push({ day, sessions });
  });
  return addPadding(parsedTimes);
}

function timesValid(allTimes) {
  // the source data always has both reception and surgery populated
  // if opening times exist
  return allTimes && allTimes.reception && allTimes.surgery;
}

function parseAll(allTimes) {
  return timesValid(allTimes) ? {
    reception: parseWeek(allTimes.reception),
    surgery: parseWeek(allTimes.surgery),
  } : {};
}

module.exports = {
  parseAll,
  parseWeek,
  parseDay
};
