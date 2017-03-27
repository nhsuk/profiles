const chai = require('chai');
const parseOpeningTimes = require('../../../app/lib/parseOpeningTimes');

const rawOpeningTimes = require('../../resources/openingTimes.json');
const rawOpeningTimesNoMonday = require('../../resources/openingTimesNoMonday.json');

const expect = chai.expect;

describe('parseOpeningTimes', () => {
  describe('parseAll', () => {
    it('should return empty object for undefined opening times', () => {
      const openingTimes = parseOpeningTimes.parseAll(undefined);
      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes).to.be.empty;
    });

    it('should return empty object for empty opening times', () => {
      const openingTimes = parseOpeningTimes.parseAll({});
      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes).to.be.empty;
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

  describe('parseWeek', () => {
    it('should add padding metadata for jagged array', () => {
      const twoSessionDay = [
        {
          opens: '07:30',
          closes: '12:30'
        },
        {
          opens: '13:30',
          closes: '20:00'
        }
      ];
      const oneSessionDay = [
        {
          opens: '07:30',
          closes: '20:00'
        },
      ];

      const week = {
        monday: twoSessionDay,
        tuesday: twoSessionDay,
        wednesday: twoSessionDay,
        thursday: oneSessionDay,
        friday: twoSessionDay,
        saturday: twoSessionDay,
        sunday: twoSessionDay,
      };

      const days = parseOpeningTimes.parseWeek(week);
      expect(days.length).to.equal(7);
      // eslint-disable-next-line no-unused-expressions
      expect(days[0].padding).to.be.undefined;
      expect(days[3].padding).to.equal(1);
    });
    it('should change closed all week to undefined', () => {
      const week = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };

      const days = parseOpeningTimes.parseWeek(week);
      // eslint-disable-next-line no-unused-expressions
      expect(days).to.be.undefined;
    });
  });

  describe('parseDay', () => {
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

      const openingTimes = parseOpeningTimes.parseDay(monday);
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

      const openingTimes = parseOpeningTimes.parseDay(monday);
      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes.length).to.equal(1);
      expect(openingTimes[0]).to.equal('7:30am to 8pm');
    });

    it('should change empty array to closed message', () => {
      const openingTimes = parseOpeningTimes.parseDay([]);
      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes.length).to.equal(1);
      expect(openingTimes[0]).to.equal('Closed');
    });
  });
});
