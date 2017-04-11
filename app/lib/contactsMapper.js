const url = require('url');

function addProtocol(website) {
  if (website) {
    return (url.parse(website).protocol)
    ? website
    : `http://${website}`;
  }
  return website;
}

function map(contacts) {
  return {
    email: contacts.email,
    fax: contacts.fax,
    telephone: contacts.telephone,
    website: addProtocol(contacts.website),
  };
}

module.exports = map;
