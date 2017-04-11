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

  it('should add http protocol to website when it does not have a protocol', () => {
    const protocollessUrl = 'www.parkpractice.co.uk';
    input.website = protocollessUrl;
    const results = contactsMapper(input);

    expect(results.email).to.be.equal(input.email);
    expect(results.fax).to.be.equal(input.fax);
    expect(results.telephone).to.be.equal(input.telephone);
    expect(results.website).to.be.equal(`http://${protocollessUrl}`);
  });

  it('should return no website when there is not one supplied', () => {
    input.website = undefined;
    const results = contactsMapper(input);

    expect(results.email).to.be.equal(input.email);
    expect(results.fax).to.be.equal(input.fax);
    expect(results.telephone).to.be.equal(input.telephone);
    // eslint-disable-next-line no-unused-expressions
    expect(results.website).to.be.undefined;
  });
});
