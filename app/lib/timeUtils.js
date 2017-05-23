function toAmPm(timeString) {
  const hoursMins = timeString.split(':');
  let hours = Number(hoursMins[0]);

  if (isNaN(hours) || isNaN(hoursMins[1])) {
    return timeString;
  }

  const suffix = (hours >= 12) ? 'pm' : 'am';

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const mins = hoursMins[1] === '00' ? '' : `:${hoursMins[1]}`;

  return `${hours}${mins}${suffix}`;
}

function dayDiff(secondDate, firstDate) {
  return Math.trunc((secondDate - firstDate) / (1000 * 60 * 60 * 24));
}

function isDateInWindow(dateString, currentDate, noDays) {
  const exceptionalDate = new Date(dateString);
  if ((dayDiff(exceptionalDate, currentDate) <= noDays) &&
    (dayDiff(exceptionalDate, currentDate) >= 0)) {
    return true;
  }
  return false;
}

// eslint-disable-next-line no-unused-vars
function isDayInWindow(day, dateString, currentDate) {
  //  TODO: what does it classify as being in the window
}

function toReadableDate(dateString, days, months) {
  const exceptionalDate = new Date(dateString);
  return `${days[exceptionalDate.getDay()]} ${exceptionalDate.getDate()} ${months[exceptionalDate.getMonth()]}:`;
}

function getCurrentDate() {
  return new Date(Date.now());
}

function joinContiguousTimes(dayOrDate) {
  const fixedDaysOrDates = dayOrDate.reduce((o, session) => {
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

  return fixedDaysOrDates.list;
}

function addTimePadding(parsedTimes) {
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

module.exports = {
  toAmPm,
  toReadableDate,
  isDateInWindow,
  isDayInWindow,
  getCurrentDate,
  joinContiguousTimes,
  addTimePadding
};
