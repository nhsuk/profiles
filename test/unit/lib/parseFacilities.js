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
      ],
    };

    const yesFacilities = parseFacilities(facilities);
    // eslint-disable-next-line no-unused-expressions
    expect(yesFacilities).to.exist;
    expect(yesFacilities.items.length).to.equal(3);
    expect(yesFacilities.items[0]).to.equal('Car parking');
    expect(yesFacilities.items[1]).to.equal('Disabled parking');
    expect(yesFacilities.items[2]).to.equal('Braille translation service');
  });

  it('should only list disabled parking once if in both parking and accessibility', () => {
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
          exists: 'Yes'
        }
      ],
    };

    const yesFacilities = parseFacilities(facilities);
    // eslint-disable-next-line no-unused-expressions
    expect(yesFacilities).to.exist;
    expect(yesFacilities.items.length).to.equal(3);
    expect(yesFacilities.items[0]).to.equal('Car parking');
    expect(yesFacilities.items[1]).to.equal('Disabled parking');
    expect(yesFacilities.items[2]).to.equal('Braille translation service');
  });

  it('should return undefined for no \'yes\' facilities', () => {
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

  it('should set title to \'Parking\' for parking available, but no accessibility facilities', () => {
    const facilities = {
      parking: [
        {
          name: 'Car Parking',
          exists: 'Yes'
        },
        {
          name: 'Cycle parking',
          exists: 'Yes'
        },
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
    expect(yesFacilities.title).to.equal('Parking');
  });

  it('should set title to \'Accessibility\' for accessibility available, but no parking facilities', () => {
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
    expect(yesFacilities.title).to.equal('Accessibility');
  });

  it('should set title to \'Parking and Accessibility\' for accessibility and parking facilities available', () => {
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
    expect(yesFacilities.title).to.equal('Parking and accessibility');
  });

  it('should rename \'Car Parking\' to \'Car parking\'', () => {
    const facilities = {
      parking: [
        {
          name: 'Car Parking',
          exists: 'Yes'
        },
      ],
    };

    const yesFacilities = parseFacilities(facilities);
    // eslint-disable-next-line no-unused-expressions
    expect(yesFacilities.items[0]).to.equal('Car parking');
  });

  it('should rename \'Disabled WC\' to \'Disabled toilet\'', () => {
    const facilities = {
      parking: [
        {
          name: 'Disabled WC',
          exists: 'Yes'
        },
      ],
    };

    const yesFacilities = parseFacilities(facilities);
    // eslint-disable-next-line no-unused-expressions
    expect(yesFacilities.items[0]).to.equal('Disabled toilet');
  });
});
