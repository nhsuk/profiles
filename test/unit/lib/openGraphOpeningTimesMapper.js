const chai = require('chai');
const mapper = require('../../../app/lib/openGraphOpeningTimesMapper');
const daysOrderedByUtcIndex = require('../../../app/lib/constants').daysOrderedByUtcIndex;

const expect = chai.expect;

describe('openGraphOpeningTimesMapper', () => {
  describe('map', () => {
    it('should return empty array for undefined opening times', () => {
      const openingTimes = mapper.map(undefined);

      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes).to.be.an('array').that.is.empty;
    });

    it('should return empty object for empty opening times', () => {
      const openingTimes = mapper.map({});

      // eslint-disable-next-line no-unused-expressions
      expect(openingTimes).to.be.an('array').that.is.empty;
    });

    it('should return an array with all weekdays', () => {
      const openingTimes = {};
      openingTimes.reception = {};
      daysOrderedByUtcIndex.forEach((day, i) => {
        switch (i) {
          case 0:
            openingTimes.reception[day.toLowerCase()] = [];
            break;
          case 3:
            openingTimes.reception[day.toLowerCase()] = [{ opens: '07:30', closes: '12:00' }, { opens: '13:30', closes: '20:00' }];
            break;
          default:
            openingTimes.reception[day.toLowerCase()] = [{ opens: '08:00', closes: '18:00' }];
        }
      });

      const openGraphOpeningTimes = mapper.map(openingTimes);

      expect(openGraphOpeningTimes).to.be.an('array');
      expect(openGraphOpeningTimes.length).to.be.equal(7);

      daysOrderedByUtcIndex.forEach((day, i) => {
        expect(openGraphOpeningTimes[i].day).to.be.equal(day.toLowerCase());
        expect(openGraphOpeningTimes[i].sessions).to.be.an('array');
        switch (i) {
          case 0:
            expect(openGraphOpeningTimes[i].sessions.length).to.be.equal(0);
            break;
          case 3:
            expect(openGraphOpeningTimes[i].sessions.length).to.be.equal(2);
            expect(openGraphOpeningTimes[i].sessions[0].opens).to.be.equal('07:30');
            expect(openGraphOpeningTimes[i].sessions[0].closes).to.be.equal('12:00');
            expect(openGraphOpeningTimes[i].sessions[1].opens).to.be.equal('13:30');
            expect(openGraphOpeningTimes[i].sessions[1].closes).to.be.equal('20:00');
            break;
          default:
            expect(openGraphOpeningTimes[i].sessions.length).to.be.equal(1);
            expect(openGraphOpeningTimes[i].sessions[0].opens).to.be.equal('08:00');
            expect(openGraphOpeningTimes[i].sessions[0].closes).to.be.equal('18:00');
        }
      });
    });
  });
});
