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
      expect(exceptionalOpeningTimes.alterations[0].formattedDate).to.equal('Monday 29 May');
      /* eslint-enable no-unused-expressions */
    });

    it('should not populate alterations for out of date exceptional opening times', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper
        .mapAll(rawExceptionalOpeningTimesNotInDate);
      /* eslint-disable no-unused-expressions */
      expect(exceptionalOpeningTimes.alterations).to.not.exist;
      /* eslint-enable no-unused-expressions */
    });
  });
});
