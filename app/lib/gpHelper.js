function pluraliseGP(count) {
  return count === 1 ? 'GP' : 'GPs';
}

function areGpsAvailable(gpCounts) {
  return !!gpCounts && (gpCounts.unknown > 0 || gpCounts.male > 0 || gpCounts.female > 0);
}

function getGpCountMessages(gpCounts) {
  const messages = [];
  if (gpCounts.female) {
    messages.push(`${gpCounts.female} female ${pluraliseGP(gpCounts.female)}`);
  }
  if (gpCounts.male) {
    messages.push(`${gpCounts.male} male ${pluraliseGP(gpCounts.male)}`);
  }
  if (gpCounts.unknown) {
    messages.push(`${gpCounts.unknown} ${pluraliseGP(gpCounts.unknown)}`);
  }

  return messages;
}

module.exports = {
  areGpsAvailable,
  getGpCountMessages,
};
