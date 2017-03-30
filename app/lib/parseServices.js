function containsEntries(services) {
  return services && services.entries && services.entries.length > 0;
}

function filterGpReferrals(services) {
  return services.entries.filter(x => x.gpReferralRequired).map(x => x.title);
}

function filterSelfReferrals(services) {
  return services.entries.filter(x => !x.gpReferralRequired).map(x => x.title);
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
