function map(services) {
  if (!services || Object.keys(services).length === 0) {
    return undefined;
  }
  const serviceEntries = services.entries;

  if (serviceEntries && serviceEntries.length > 0) {
    const gpReferrals =
      serviceEntries.filter(x => x.gpReferralRequired).map(x => x.title);
    const selfReferrals =
      serviceEntries.filter(x => !(x.gpReferralRequired)).map(x => x.title);

    return { gpReferrals, selfReferrals };
  }

  return undefined;
}

module.exports = {
  map,
};
