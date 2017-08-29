const chai = require('chai');
const mapper = require('../../../app/lib/schemaOrgOpeningTimesMapper');
const daysOrderedByUtcIndex = require('../../../app/lib/constants').daysOrderedByUtcIndex;

const expect = chai.expect;

function generateReceptionTimes() {
  const times = {};
  daysOrderedByUtcIndex.forEach((day) => {
    switch (day) {
      case 'Sunday':
        times[day.toLowerCase()] = [];
        break;
      case 'Wednesday':
        times[day.toLowerCase()] = [{ opens: '07:30', closes: '12:00' }, { opens: '13:30', closes: '20:00' }];
        break;
      default:
        times[day.toLowerCase()] = [{ opens: '08:00', closes: '18:00' }];
    }
  });
  return times;
}

function generateSurgeryTimes() {
  const times = {};
  daysOrderedByUtcIndex.forEach((day) => {
    switch (day) {
      case 'Sunday':
        times[day.toLowerCase()] = [];
        break;
      case 'Wednesday':
        times[day.toLowerCase()] = [{ opens: '08:00', closes: '12:00' }, { opens: '14:00', closes: '21:00' }];
        break;
      default:
        times[day.toLowerCase()] = [{ opens: '08:30', closes: '19:00' }];
    }
  });
  return times;
}

describe('openGraphOpeningTimesMapper', () => {
  describe('map', () => {
    describe('for empty times', () => {
      it('shoUld return empty array for undefined opening times', () => {
        const openingTimes = mapper.map(undefined);

        // eslint-disable-next-line no-unused-expressions
        expect(openingTimes).to.be.an('array').that.is.empty;
      });

      it('should return empty object for empty opening times', () => {
        const openingTimes = mapper.map({});

        // eslint-disable-next-line no-unused-expressions
        expect(openingTimes).to.be.an('array').that.is.empty;
      });
    });

    describe('for populated times', () => {
      const openingTimes = {};
      openingTimes.reception = generateReceptionTimes();
      openingTimes.surgery = generateSurgeryTimes();

      const allOpeningTimes = mapper.map(openingTimes);
      const receptionOpeningTimes = allOpeningTimes.filter(time => time.description === 'Reception');
      const surgeryOpeningTimes = allOpeningTimes.filter(time => time.description === 'Surgery');

      it('should return all reception times', () => {
        let assertionsMade = 0;

        const expectedNumberReceptionOpeningTimes = receptionOpeningTimes.length;
        expect(expectedNumberReceptionOpeningTimes).to.be.equal(7);

        receptionOpeningTimes.forEach((openingTime) => {
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

        expect(assertionsMade).to.equal(expectedNumberReceptionOpeningTimes);
      });

      it('should return all surgery times', () => {
        let assertionsMade = 0;

        const expectedNumberSurgeryOpeningTimes = surgeryOpeningTimes.length;
        expect(expectedNumberSurgeryOpeningTimes).to.be.equal(7);

        surgeryOpeningTimes.forEach((openingTime) => {
          expect(openingTime['@type']).to.be.equal('OpeningHoursSpecification');
          expect(openingTime.description).to.be.equal('Surgery');
          const day = openingTime.dayOfWeek.split('/')[3];
          switch (day) {
            case 'Monday':
            case 'Tuesday':
            case 'Thursday':
            case 'Friday':
            case 'Saturday':
              assertionsMade += 1;
              expect(openingTime.opens).to.be.equal('08:30');
              expect(openingTime.closes).to.be.equal('19:00');
              break;
            case 'Wednesday':
              assertionsMade += 1;
              expect(openingTime.opens).to.satisfy(time => time === '08:00' || time === '14:00');
              expect(openingTime.closes).to.satisfy(time => time === '12:00' || time === '21:00');
              break;
            default:
          }
        });

        expect(assertionsMade).to.equal(expectedNumberSurgeryOpeningTimes);
      });
    });
  });
});
