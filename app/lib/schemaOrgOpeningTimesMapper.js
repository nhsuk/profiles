function mapWeek(times) {
  const week = [];

  Object.keys(times)
    .forEach((day) => {
      times[day].forEach((session) => {
        const dayOfWeek = day.charAt(0).toUpperCase() + day.slice(1);
        week.push({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `http://schema.org/${dayOfWeek}`,
          opens: session.opens,
          closes: session.closes
        });
      });
    });

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
