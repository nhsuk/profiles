const timeUtils = require('./timeUtils');
const constants = require('./constants');

const daysOrderedByUtcIndex = constants.daysOrderedByUtcIndex;
const months = constants.months;

function joinContiguousTimes(keySessions) {
  const fixedKeySessions = keySessions.reduce((o, session) => {
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

  return fixedKeySessions.list;
}

function addMarkupProperties(parsedTimes) {
  const counts = parsedTimes.map(time => time.sessions.length);
  const max = Math.max(...counts);

  parsedTimes.forEach((time) => {
    if (time.sessions.length < max) {
      // eslint-disable-next-line no-param-reassign
      time.padding = (max - time.sessions.length);
    } else if ((time.sessions.length === 1)) {
      // eslint-disable-next-line no-param-reassign
      time.oneSession = 'one-session';
    }
  });

  return parsedTimes;
}

function dayDiff(secondDate, firstDate) {
  return Math.trunc((secondDate - firstDate) / (1000 * 60 * 60 * 24));
}

function isDateInWindow(dateString, currentDate, noDays) {
  const exceptionalDate = timeUtils.getDateFromDateString(dateString);

  return (dayDiff(exceptionalDate, currentDate) <= noDays) &&
    (dayDiff(exceptionalDate, currentDate) >= 0);
}

function toReadableDate(dateString) {
  const exceptionalDate = timeUtils.getDateFromDateString(dateString);
  const dayOfWeek = daysOrderedByUtcIndex[exceptionalDate.getUTCDay()];
  const date = exceptionalDate.getUTCDate();
  const month = months[exceptionalDate.getUTCMonth()];

  return `${dayOfWeek} ${date} ${month}`;
}

function mapDay(keySessions) {
  // empty day field doesn't occur in the source data, added default in case
  // it changes in future
  if (keySessions === undefined) {
    return ['No information available'];
  }

  // eslint-disable-next-line arrow-body-style
  const sessions = joinContiguousTimes(keySessions).map((session) => {
    return `${timeUtils.toAmPm(session.opens)} to ${timeUtils.toAmPm(session.closes)}`;
  });

  if (sessions.length === 0) {
    sessions.push('Closed');
  }

  return sessions;
}

module.exports = {
  isDateInWindow,
  toReadableDate,
  addMarkupProperties,
  mapDay,
};
