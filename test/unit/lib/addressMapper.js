const chai = require('chai');
const addressMapper = require('../../../app/lib/addressMapper');

const expect = chai.expect;

describe('addressMapper', () => {
  it('should not attempt to map addressLines when there are none', () => {
    const input = {};
    const mappedAddress = addressMapper(input);

    // eslint-disable-next-line no-unused-expressions
    expect(mappedAddress.streetAddress).to.be.undefined;
    expect(mappedAddress).to.be.equal(input);
  });

  it('should return postcode on address', () => {
    const postcode = 'ab1234cd';
    const input = { postcode };
    const mappedAddress = addressMapper(input);

    // eslint-disable-next-line no-unused-expressions
    expect(mappedAddress.streetAddress).to.be.undefined;
    expect(mappedAddress.postcode).to.be.equal(postcode);
  });

  it('should flatten addressLines array into streetAddress', () => {
    const mappedAddress = addressMapper({ addressLines: ['1 Long Lane', 'Fartown', 'Low County', 'New Place'] });

    // eslint-disable-next-line no-unused-expressions
    expect(mappedAddress.streetAddress).to.not.be.undefined;
    expect(mappedAddress.streetAddress).to.be.equal('1 Long Lane, Fartown, Low County, New Place');
  });
});
