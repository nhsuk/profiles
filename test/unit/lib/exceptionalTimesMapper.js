const chai = require('chai');
const tk = require('timekeeper');

const exceptionalTimesMapper = require('../../../app/lib/exceptionalTimesMapper');

const rawExceptionalOpeningTimes = require('../../resources/exceptionalOpeningTimes.json');
const rawExceptionalOpeningTimesNotInDate = require('../../resources/exceptionalOpeningTimesNotInDate.json');

const expect = chai.expect;

function mockCurrentDate() {
  const day25 = 25;
  const monthOfMay = 4; // it's expected to be off by one
  const year2017 = 2017;

  return new Date(year2017, monthOfMay, day25);
}

describe('exceptionalOpeningTimesMapper', () => {
  describe('mapAll', () => {
    it('should return empty object for undefined opening times', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper.mapAll(undefined);

      // eslint-disable-next-line no-unused-expressions
      expect(exceptionalOpeningTimes).to.be.undefined;
    });

    it('should return empty object for empty opening times', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper.mapAll({});

      // eslint-disable-next-line no-unused-expressions
      expect(exceptionalOpeningTimes).to.be.undefined;
    });

    it('should display changes to opening times within the next two weeks', () => {
      tk.travel(mockCurrentDate());
      const exceptionalOpeningTimes = exceptionalTimesMapper.mapAll(rawExceptionalOpeningTimes);
      /* eslint-disable no-unused-expressions */

      expect(exceptionalOpeningTimes.alterations).to.exist;
      expect(exceptionalOpeningTimes.alterations[0].formattedDate).to.equal('Thursday 25 May');
      /* eslint-enable no-unused-expressions */
      tk.reset();
    });

    it('should not display changes to opening times if they dont\'t exist', () => {
      const exceptionalOpeningTimes = exceptionalTimesMapper
        .mapAll(rawExceptionalOpeningTimesNotInDate);
      /* eslint-disable no-unused-expressions */

      expect(exceptionalOpeningTimes.alterations).to.not.exist;
      /* eslint-enable no-unused-expressions */
    });
  });
});
