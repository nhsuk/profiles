const chai = require('chai');
const exceptionalTimesMapper = require('../../../app/lib/exceptionalTimesMapper');

const rawExceptionalOpeningTimes = require('../../resources/exceptionalOpeningTimes.json');
const rawExceptionalOpeningTimesNotInDate = require('../../resources/exceptionalOpeningTimesNotInDate.json');

const expect = chai.expect;

describe('exceptionalOpeningTimesMapper', () => {
  describe('mapAll', () => {
    it('should return empty object for undefined opening times', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper.mapAll(undefined);
      // eslint-disable-next-line no-unused-expressions
      expect(exceptionalOpeningTimes).to.be.empty;
    });

    it('should return empty object for empty opening times', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper.mapAll({});
      // eslint-disable-next-line no-unused-expressions
      expect(exceptionalOpeningTimes).to.be.empty;
    });

    it('should populate alterations for in date exceptional opening times', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper.mapAll(rawExceptionalOpeningTimes);
      /* eslint-disable no-unused-expressions */
      expect(exceptionalOpeningTimes.alterations).to.exist;
      expect(exceptionalOpeningTimes.alterations[0].formattedDate).to.equal('Thursday 25 May:');
      /* eslint-enable no-unused-expressions */
    });

    it('should not populate alterations for out of date exceptional opening times', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper
        .mapAll(rawExceptionalOpeningTimesNotInDate);
      /* eslint-disable no-unused-expressions */
      expect(exceptionalOpeningTimes.reception).to.not.exist;
      /* eslint-enable no-unused-expressions */
    });
  });

  xdescribe('mapDates', () => {
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

      const dates = {
        '22/05/2017': twoSessionDay,
        '23/05/2017': twoSessionDay,
        '24/05/2017': oneSessionDay,
        '25/05/2017': oneSessionDay,
      };

      const formattedDates = exceptionalTimesMapper.mapDates(dates);
      expect(formattedDates.length).to.equal(4);
      // eslint-disable-next-line no-unused-expressions
      expect(formattedDates[0].padding).to.be.undefined;
      expect(formattedDates[2].padding).to.equal(1);
      expect(formattedDates[3].padding).to.equal(1);
    });
  });
});
