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
  if (gpData.supplier) {
    let bookOnlineLink;
    switch (gpData.supplier) {
      case 'EMIS':
        bookOnlineLink = 'https://patient.emisaccess.co.uk/Account/Login';
        break;
      case 'Informatica':
      case 'INPS':
        bookOnlineLink = 'https://www.myvisiononline.co.uk/vpp/';
        break;
      case 'Microtest':
        bookOnlineLink = 'https://www.thewaiting-room.net/';
        break;
      case 'TPP':
        bookOnlineLink = `https://systmonline.tpp-uk.com/Login?PracticeId=${gpData.odsCode}`;
        break;
      case 'NK':
      case 'EMIS (I)':
      case 'INPS (I)':
        bookOnlineLink = gpData.contact.website;
        break;
      default:
        bookOnlineLink = undefined;
    }
    return bookOnlineLink;
  }
  return gpData.contact.website;
}

module.exports = {
  areGpsAvailable,
  getBookOnlineLink,
  getGpCountMessages,
};
