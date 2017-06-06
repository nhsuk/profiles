const utils = require('./utils');

const ALIASES = {
  'Car Parking': 'Car parking',
  'Disabled WC': 'Disabled toilet',
  'Step free access': 'Step-free access',
};

function correctName(name) {
  return ALIASES[name] || name;
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

function createItemList(parking, accessibility) {
  if (parking.length === 1 && accessibility.length === 0) {
    return [`${correctName(parking[0])} is available`];
  }

  return utils.removeDuplicates(parking.concat(accessibility)).map(correctName);
}

function map(allFacilities) {
  if (allFacilities) {
    const parking = filterYes(allFacilities.parking);
    const accessibility = filterYes(allFacilities.accessibility);
    const title = getTitle(parking, accessibility);
    const items = createItemList(parking, accessibility);

    return items.length === 0 ? undefined : { title, items };
  }

  return undefined;
}

module.exports = map;
