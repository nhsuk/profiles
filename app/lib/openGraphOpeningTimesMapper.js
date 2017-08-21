function mapWeek(times) {
  const week = [];

  Object.keys(times).map(key => week.push({ day: key, sessions: times[key] }));

  return week;
}

function containsReceptionTimes(times) {
  return times && times.reception;
}

function map(openingTimes) {
  return containsReceptionTimes(openingTimes) ? mapWeek(openingTimes.reception) : [];
}

module.exports = {
  map,
};
