const utils = require('./utils');

function containsEntries(services) {
  return services && services.entries && services.entries.length > 0;
}

function filterGpReferrals(services) {
  const gpReferrals = services.entries.filter(x => x.gpReferralRequired).map(x => x.title);

  return utils.sortIgnoreCase(gpReferrals);
}

function filterSelfReferrals(services) {
  const selfReferrals = services.entries.filter(x => !x.gpReferralRequired).map(x => x.title);

  return utils.sortIgnoreCase(selfReferrals);
}

function map(services) {
  if (containsEntries(services)) {
    return {
      gpReferrals: filterGpReferrals(services),
      selfReferrals: filterSelfReferrals(services),
    };
  }

  return undefined;
}

module.exports = map;
