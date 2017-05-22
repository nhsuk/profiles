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

function isDateInWindow(dateString, now, noDays) {
  const exceptionalDate = new Date(dateString);
  if ((dayDiff(exceptionalDate, new Date(now)) <= noDays) &&
    (dayDiff(exceptionalDate, new Date(now)) >= 0)) {
    return true;
  }
  return false;
}

function toReadableDate(dateString, days, months) {
  const exceptionalDate = new Date(dateString);
  return `${days[exceptionalDate.getDay()]} ${exceptionalDate.getDate()} ${months[exceptionalDate.getMonth()]}`;
}

module.exports = {
  toAmPm,
  toReadableDate,
  isDateInWindow,
};
