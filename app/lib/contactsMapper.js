function map(contacts) {
  return {
    email: contacts.email,
    fax: contacts.fax,
    telephone: contacts.telephone,
    website: contacts.website,
  };
}

module.exports = map;
