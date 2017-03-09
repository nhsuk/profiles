const chai = require('chai');

const timeUtils = require('../../../app/lib/timeUtils');

const expect = chai.expect;

describe('timeUtils', () => {
  describe('toAmPm', () => {
    it('it should add am suffix to time before 12:00', () => {
      const time = timeUtils.toAmPm('08:30');
      expect(time).to.equal('8:30am');
    });

    it('it should add pm suffix to time after 12:00', () => {
      const time = timeUtils.toAmPm('18:30');
      expect(time).to.equal('6:30pm');
    });

    it('it should report midnight as 12:00am', () => {
      const time = timeUtils.toAmPm('00:00');
      expect(time).to.equal('12:00am');
    });

    it('it should report noon as 12:00pm', () => {
      const time = timeUtils.toAmPm('12:00');
      expect(time).to.equal('12:00pm');
    });

    it('it should return invalid strings unchanged', () => {
      const time = timeUtils.toAmPm('notATime');
      expect(time).to.equal('notATime');
    });
  });
});

