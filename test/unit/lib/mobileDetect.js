const chai = require('chai');
const mobileDetect = require('../../../app/lib/mobileDetect.js');

const expect = chai.expect;

describe('mobileDetect', () => {
  it('returns true or false if on mobile', () => {
    const uaString = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36.';
    const expectedResult = false;
    const result = mobileDetect.mobilecheck(uaString);

    expect(result).to.be.equal(expectedResult);
  });
});
