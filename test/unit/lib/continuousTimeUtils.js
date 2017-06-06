const chai = require('chai');
const openingTimesUtils = require('../../../app/lib/openingTimesUtils');

const expect = chai.expect;

describe('isDateInWindow', () => {
  it('should return true if the proposed date in not in the past and it\'s le than 14 days from today', () => {
    const dateString = '2017-05-27';
    const currentDate = new Date(2017, 4, 25); // May 25 2017
    const noDays = 14;
    const result = openingTimesUtils.isDateInWindow(dateString, currentDate, noDays);

    expect(result).to.equal(true);
  });

  it('should return false if the proposed date is in the past', () => {
    const dateString = '2016-05-20';
    const currentDate = new Date(2017, 4, 22); // May 22 2017
    const noDays = 14;
    const result = openingTimesUtils.isDateInWindow(dateString, currentDate, noDays);

    expect(result).to.equal(false);
  });

  it('should return false if the proposed date is more than 14 days in the future', () => {
    const dateString = '2017-05-16';
    const currentDate = new Date(2017, 4, 1); // May 1 2017
    const noDays = 14;
    const result = openingTimesUtils.isDateInWindow(dateString, currentDate, noDays);

    expect(result).to.equal(false);
  });
});

describe('toReadableDate', () => {
  it('should return the formatted date based on day, date and month for Sunday and December', () => {
    const dateString = '2016-12-04';
    const result = openingTimesUtils.toReadableDate(dateString);

    expect(result).to.equal('Sunday 4 December');
  });
  it('should return the formatted date based on day, date and month for Monday and January', () => {
    const dateString = '2017-01-02';
    const result = openingTimesUtils.toReadableDate(dateString);

    expect(result).to.equal('Monday 2 January');
  });
  it('should return the formatted date based on day, date and month', () => {
    const dateString = '2017-05-25';
    const result = openingTimesUtils.toReadableDate(dateString);

    expect(result).to.equal('Thursday 25 May');
  });
});

describe('mapDay', () => {
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

    const openingTimes = openingTimesUtils.mapDay(monday);
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

    const openingTimes = openingTimesUtils.mapDay(monday);
    // eslint-disable-next-line no-unused-expressions

    expect(openingTimes.length).to.equal(1);
    expect(openingTimes[0]).to.equal('7:30am to 8pm');
  });

  it('should change empty array to closed message', () => {
    const openingTimes = openingTimesUtils.mapDay([]);
    // eslint-disable-next-line no-unused-expressions

    expect(openingTimes.length).to.equal(1);
    expect(openingTimes[0]).to.equal('Closed');
  });
});
