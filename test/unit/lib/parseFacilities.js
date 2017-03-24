const chai = require('chai');
const parseFacilities = require('../../../app/lib/parseFacilities');

const expect = chai.expect;

describe('parseFacilities', () => {
  it('should gracefully handle undefined facilities', () => {
    const openingTimes = parseFacilities(undefined);
    // eslint-disable-next-line no-unused-expressions
    expect(openingTimes).to.be.undefined;
  });

  it('should join parking and accessibility, returning only facilities where exists is yes', () => {
    const facilities = {
      parking: [
        {
          name: 'Car Parking',
          exists: 'Yes'
        },
        {
          name: 'Cycle parking',
          exists: 'No'
        },
        {
          name: 'Disabled parking',
          exists: 'Yes'
        }
      ],
      accessibility: [
        {
          name: 'Braille translation service',
          exists: 'Yes'
        },
        {
          name: 'Disabled parking',
          exists: 'No'
        }
      ],
    };

    const yesFacilities = parseFacilities(facilities);
    // eslint-disable-next-line no-unused-expressions
    expect(yesFacilities).to.exist;
    expect(yesFacilities.length).to.equal(3);
    expect(yesFacilities[0]).to.equal('Car Parking');
    expect(yesFacilities[1]).to.equal('Disabled parking');
    expect(yesFacilities[2]).to.equal('Braille translation service');
  });

  it('should return undefined for no yes facilities', () => {
    const facilities = {
      parking: [
        {
          name: 'Car Parking',
          exists: 'No'
        },
        {
          name: 'Cycle parking',
          exists: 'No'
        },
        {
          name: 'Disabled parking',
          exists: 'No'
        }
      ],
      accessibility: [
        {
          name: 'Braille translation service',
          exists: 'No'
        },
        {
          name: 'Disabled parking',
          exists: 'No'
        }
      ],
    };

    const yesFacilities = parseFacilities(facilities);
    // eslint-disable-next-line no-unused-expressions
    expect(yesFacilities).to.be.undefined;
  });
});
