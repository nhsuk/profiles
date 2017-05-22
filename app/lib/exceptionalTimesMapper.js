const timeUtils = require('./timeUtils');

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function joinContiguousTimes(date) {
  const fixedDates = date.reduce((o, session) => {
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

  return fixedDates.list;
}

function mapDate(date) {
  // eslint-disable-next-line arrow-body-style
  const sessions = joinContiguousTimes(date).map((session) => {
    return `${timeUtils.toAmPm(session.opens)} to ${timeUtils.toAmPm(session.closes)}`;
  });

  if (sessions.length === 0) {
    sessions.push('Closed');
  }
  return sessions;
}

function getDates(times) {
  const filteredTimes = {};
  Object.keys(times).forEach((exceptionalTime) => {
    if (timeUtils.isDateInWindow(exceptionalTime, timeUtils.getCurrentDate(), 14) === true) {
      filteredTimes[exceptionalTime] = times[exceptionalTime];
    }
  });
  return filteredTimes;
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

function mapDates(times) {
  const parsedTimes = [];

  Object.keys(getDates(times)).forEach((date) => {
    const formattedDate = timeUtils.toReadableDate(date, daysOfWeek, months);
    const sessions = mapDate(times[date]);
    parsedTimes.push({ formattedDate, sessions });
  });
  return addPadding(parsedTimes);
}

function timesValid(allTimes) {
  // the source data may not have alterations even if opening times exist
  return allTimes && allTimes.alterations;
}

function mapAll(allTimes) {
  return timesValid(allTimes) ? {
    alterations: mapDates(allTimes.alterations),
  } : {};
}

module.exports = {
  mapAll,
  mapDates,
  mapDate,
};
