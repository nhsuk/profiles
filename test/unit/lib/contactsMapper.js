const chai = require('chai');
const contactsMapper = require('../../../app/lib/contactsMapper');

const expect = chai.expect;

describe('contactsMapper', () => {
  const input = {
    email: 'an.email@address',
    fax: '09876543210',
    telephone: '01234567890',
    website: 'http://www.nhs.uk',
  };

  it('should return all contact properties', () => {
    const results = contactsMapper(input);

    expect(results.email).to.be.equal(input.email);
    expect(results.fax).to.be.equal(input.fax);
    expect(results.telephone).to.be.equal(input.telephone);
    expect(results.website).to.be.equal(input.website);
  });
});
