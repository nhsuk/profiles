const chai = require('chai');
const mapper = require('../../../app/lib/schemaOrgOpeningTimesMapper');
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
      const openingTimeSpecifications = openGraphOpeningTimes.length;

      expect(openGraphOpeningTimes).to.be.an('array');
      expect(openingTimeSpecifications).to.be.equal(7);

      let assertionsMade = 0;

      openGraphOpeningTimes.forEach((openingTime) => {
        expect(openingTime['@type']).to.be.equal('OpeningHoursSpecification');
        const day = openingTime.dayOfWeek.split('/')[3];
        switch (day) {
          case 'Monday':
          case 'Tuesday':
          case 'Thursday':
          case 'Friday':
          case 'Saturday':
            assertionsMade += 1;
            expect(openingTime.opens).to.be.equal('08:00');
            expect(openingTime.closes).to.be.equal('18:00');
            break;
          case 'Wednesday':
            assertionsMade += 1;
            expect(openingTime.opens).to.satisfy(time => time === '07:30' || time === '13:30');
            expect(openingTime.closes).to.satisfy(time => time === '12:00' || time === '20:00');
            break;
          default:
        }
      });

      expect(assertionsMade).to.equal(openingTimeSpecifications);
    });
  });
});
