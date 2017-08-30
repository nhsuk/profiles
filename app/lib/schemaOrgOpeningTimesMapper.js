function mapWeek(times, description) {
  const week = [];

  Object.keys(times)
    .forEach((day) => {
      times[day].forEach((session) => {
        const dayOfWeek = day.charAt(0).toUpperCase() + day.slice(1);
        week.push({
          '@type': 'OpeningHoursSpecification',
          description,
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

function containsSurgeryTimes(times) {
  return times && times.surgery;
}

function map(openingTimes) {
  const receptionTimes =
    containsReceptionTimes(openingTimes) ? mapWeek(openingTimes.reception, 'Reception') : [];
  const surgeryTimes = containsSurgeryTimes(openingTimes) ? mapWeek(openingTimes.surgery, 'Surgery') : [];
  return receptionTimes.concat(surgeryTimes);
}

module.exports = {
  map,
};
