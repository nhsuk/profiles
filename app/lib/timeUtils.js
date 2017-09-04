function toAmPm(timeString) {
  const hoursMins = timeString.split(':');
  let hours = Number(hoursMins[0]);

  if (Number.isNaN(hours) || Number.isNaN(hoursMins[1])) {
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

function getToday() {
  return new Date();
}

function getDateFromDateString(dateString) {
  // the exceptional opening times keys are formatted as 'yyyy-mm-dd'
  const dateArr = dateString.split('-');
  const year = dateArr[0];
  const month = dateArr[1] - 1;
  const date = dateArr[2];

  return new Date(year, month, date);
}

module.exports = {
  toAmPm,
  getToday,
  getDateFromDateString,
};
