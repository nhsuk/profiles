const chai = require('chai');
const mapper = require('../../../app/lib/onlineTasksMapper');

const expect = chai.expect;

describe('onlineTasksMapper', () => {
  it('should return undefined when there is no booking system', () => {
    const result = mapper({});

    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.undefined;
  });

  it('should return booking link', () => {
    const bookOnlineLink = 'http://a.link.here';
    const input = {
      bookingSystem: {
        bookOnlineLink
      },
    };

    const results = mapper(input);

    expect(results).to.be.equal(bookOnlineLink);
  });
});
