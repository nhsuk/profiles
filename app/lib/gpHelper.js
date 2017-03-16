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

function getBookOnlineLink(gpData) {
  switch (gpData.supplier) {
    case 'EMIS':
      return 'https://patient.emisaccess.co.uk/Account/Login';
    case 'Informatica':
    case 'INPS':
      return 'https://www.myvisiononline.co.uk/vpp/';
    case 'Microtest':
      return 'https://www.thewaiting-room.net/';
    case 'TPP':
      return `https://systmonline.tpp-uk.com/Login?PracticeId=${gpData.odsCode}`;
    case 'NK':
    case 'EMIS (I)':
    case 'INPS (I)':
    default:
      return gpData.contact.website;
  }
}

module.exports = {
  areGpsAvailable,
  getBookOnlineLink,
  getGpCountMessages,
};
