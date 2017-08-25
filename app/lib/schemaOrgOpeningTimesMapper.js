function mapWeek(weeklyOpeningSessions) {
  const week = [];

  const daySessions = Object.keys(weeklyOpeningSessions);

  for (let i = 0; i < daySessions.length; i++) {
    const day = daySessions[i];
    const dailySessions = weeklyOpeningSessions[day];

    for (let j = 0; j < dailySessions.length; j++) {
      const dayOfWeek = day.charAt(0).toUpperCase() + day.slice(1);
      week.push({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `http://schema.org/${dayOfWeek}`,
        opens: dailySessions[j].opens,
        closes: dailySessions[j].closes
      });
    }
  }

  return week;
}

function containsReceptionTimes(weeklyOpeningSessions) {
  return weeklyOpeningSessions && weeklyOpeningSessions.reception;
}

function map(weeklyOpeningSessions) {
  return containsReceptionTimes(weeklyOpeningSessions)
    ? mapWeek(weeklyOpeningSessions.reception)
    : [];
}

module.exports = {
  map,
};
