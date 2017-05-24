const chai = require('chai');
const timeUtils = require('../../../app/lib/timeUtils');
const tk = require('timekeeper');

const expect = chai.expect;

function mockCurrentDate() {
  return new Date('26/05/2017');
}

beforeEach((done) => {
  tk.travel(mockCurrentDate());
  done();
});

afterEach((done) => {
  tk.reset();
  done();
});


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

    it('it should remove minutes for times on the hour', () => {
      const time = timeUtils.toAmPm('07:00');
      expect(time).to.equal('7am');
    });

    it('it should report midnight as 12:00am', () => {
      const time = timeUtils.toAmPm('00:00');
      expect(time).to.equal('12am');
    });

    it('it should report noon as 12pm', () => {
      const time = timeUtils.toAmPm('12:00');
      expect(time).to.equal('12pm');
    });

    it('it should return invalid strings unchanged', () => {
      const time = timeUtils.toAmPm('notATime');
      expect(time).to.equal('notATime');
    });
  });

  describe('getToday', () => {
    xit('it should get today\'s date', () => {
      const time = timeUtils.getToday();
      expect(time.toISOString().slice(0, 10)).to.equal('2017-05-26');
    });

    it('it should return a date value', () => {
      const time = timeUtils.getToday();
      expect(time).to.be.a('date');
    });
  });
});
