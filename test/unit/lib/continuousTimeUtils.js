const chai = require('chai');
const continuousTimeUtils = require('../../../app/lib/continuousTimeUtils');

const expect = chai.expect;

describe('mapKey', () => {
  it('should change array of 24 hour open close times to array of from to messages', () => {
    const monday = [
      {
        opens: '07:30',
        closes: '12:30'
      },
      {
        opens: '13:30',
        closes: '20:00'
      }
    ];

    const openingTimes = continuousTimeUtils.mapKey(monday);
    // eslint-disable-next-line no-unused-expressions
    expect(openingTimes.length).to.equal(2);
    expect(openingTimes[0]).to.equal('7:30am to 12:30pm');
    expect(openingTimes[1]).to.equal('1:30pm to 8pm');
  });

  it('should replace contiguous times with a single message', () => {
    const monday = [
      {
        opens: '07:30',
        closes: '12:30'
      },
      {
        opens: '12:30',
        closes: '20:00'
      }
    ];

    const openingTimes = continuousTimeUtils.mapKey(monday);
    // eslint-disable-next-line no-unused-expressions
    expect(openingTimes.length).to.equal(1);
    expect(openingTimes[0]).to.equal('7:30am to 8pm');
  });

  it('should change empty array to closed message', () => {
    const openingTimes = continuousTimeUtils.mapKey([]);
    // eslint-disable-next-line no-unused-expressions
    expect(openingTimes.length).to.equal(1);
    expect(openingTimes[0]).to.equal('Closed');
  });
});
