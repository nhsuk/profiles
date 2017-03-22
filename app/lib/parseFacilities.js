function filterYes(item) {
  return item.filter(e => e.exists === 'Yes').map(f => f.name);
}

function parseFacilities(allFacilities) {
  if (allFacilities) {
    const parking = allFacilities.parking ? filterYes(allFacilities.parking) : [];
    const accessibility = allFacilities.accessibility ? filterYes(allFacilities.accessibility) : [];
    const allYes = parking.concat(accessibility);
    return allYes.length === 0 ? undefined : allYes;
  }
  return undefined;
}

module.exports = parseFacilities;
