const chai = require('chai');
const parseOpeningTimes = require('../../../app/lib/parseOpeningTimes');

const rawOpeningTimes = require('../../resources/openingTimes.json');
const rawOpeningTimesNoMonday = require('../../resources/openingTimesNoMonday.json');

const expect = chai.expect;

describe('parseOpeningTimes', () => {
  describe('parseAll', () => {
    it('should return undefined for empty opening times', () => {
      const openingTimes = parseOpeningTimes.parseAll(undefined);
      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes).to.be.undefined;
    });
    it('should gracefully handle missing days on opening times', () => {
      const openingTimes = parseOpeningTimes.parseAll(rawOpeningTimesNoMonday);
      /* eslint-disable no-unused-expressions */
      expect(openingTimes.reception).to.exist;
      expect(openingTimes.reception[0].day).to.equal('Monday');
      expect(openingTimes.reception[0].sessions[0]).to.equal('No information available');
      expect(openingTimes.surgery).to.exist;
      /* eslint-enable no-unused-expressions */
    });

    it('should populate reception and surgery for valid opening times', () => {
      const openingTimes = parseOpeningTimes.parseAll(rawOpeningTimes);
      /* eslint-disable no-unused-expressions */
      expect(openingTimes.reception).to.exist;
      expect(openingTimes.reception[0].day).to.equal('Monday');
      expect(openingTimes.surgery).to.exist;
      /* eslint-enable no-unused-expressions */
    });
  });

  describe('parseDay', () => {
    it('should change array of 24 hour open close times to array of from to messages', () => {
      const monday = [
        {
          opens: '07:30',
          closes: '18:30'
        },
        {
          opens: '18:30',
          closes: '20:00'
        }
      ];

      const openingTimes = parseOpeningTimes.parseDay(monday);
      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes.length).to.equal(2);
      expect(openingTimes[0]).to.equal('7:30am to 6:30pm');
      expect(openingTimes[1]).to.equal('6:30pm to 8:00pm');
    });
  });

  describe('parseDay', () => {
    it('should change empty array to closed message', () => {
      const openingTimes = parseOpeningTimes.parseDay([]);
      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes.length).to.equal(1);
      expect(openingTimes[0]).to.equal('Closed');
    });
  });
});

