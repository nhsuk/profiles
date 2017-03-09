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

  return `${hours}:${hoursMins[1]}${suffix}`;
}

module.exports = { toAmPm };
