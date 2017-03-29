const utils = require('./utils');

const ALIASES = {
  'Car Parking': 'Car parking',
  'Disabled WC': 'Disabled toilet',
  'Step free access': 'Step-free access',
};

function correctNames(names) {
  return names.map(name => ALIASES[name] || name);
}

function filterYes(item) {
  return item ? item.filter(e => e.exists === 'Yes').map(f => f.name) : [];
}

function getTitle(parking, accessibility) {
  const titles = [];
  if (parking.length > 0) {
    titles.push('Parking');
  }
  if (accessibility.length > 0) {
    titles.push(titles.length === 1 ? 'accessibility' : 'Accessibility');
  }

  return titles.join(' and ');
}

function parseFacilities(allFacilities) {
  if (allFacilities) {
    const parking = filterYes(allFacilities.parking);
    const accessibility = filterYes(allFacilities.accessibility);
    const title = getTitle(parking, accessibility);
    const items = correctNames(utils.removeDuplicates(parking.concat(accessibility)));
    return items.length === 0 ? undefined : { title, items };
  }
  return undefined;
}

module.exports = parseFacilities;
