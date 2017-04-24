const chai = require('chai');
const mapper = require('../../../app/lib/onlineTasksMapper');

const expect = chai.expect;

describe('onlineTasksMapper', () => {
  const repeatScriptsLink = 'http://order.repeat.scripts';
  const bookOnlineLink = 'http://book.online';

  it('should return undefined when there are no online tasks', () => {
    const response = mapper({});

    // eslint-disable-next-line no-unused-expressions
    expect(response).to.be.undefined;
  });

  it('should return booking link as part of an object member', () => {
    const input = { bookingSystem: { bookOnlineLink } };

    const response = mapper(input);

    expect(response).to.be.an('object');
    expect(response.bookOnlineLink).to.be.equal(bookOnlineLink);
  });

  it('should return repeat prescriptions link as part of an object member', () => {
    const input = { onlineServices: { repeatPrescriptions: { url: repeatScriptsLink } } };

    const response = mapper(input);

    expect(response).to.be.an('object');
    expect(response.repeatPrescriptionOnlineLink)
      .to.be.equal(repeatScriptsLink);
  });

  it('should return all online services when they are all available', () => {
    const input = {
      onlineServices: { repeatPrescriptions: { url: repeatScriptsLink } },
      bookingSystem: { bookOnlineLink },
    };

    const response = mapper(input);

    expect(response).to.be.an('object');
    expect(response.bookOnlineLink).to.be.equal(bookOnlineLink);
    expect(response.repeatPrescriptionOnlineLink)
      .to.be.equal(repeatScriptsLink);
  });
});
