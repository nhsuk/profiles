const chai = require('chai');
const servicesMapper = require('../../../app/lib/servicesMapper');

const expect = chai.expect;

describe('servicesMapper', () => {
  const selfRefService = { gpReferralRequired: false, title: 'self ref service' };
  const gpRefService = { gpReferralRequired: true, title: 'gp ref service' };

  it('should return undefined for undefined', () => {
    const results = servicesMapper(undefined);

    // eslint-disable-next-line no-unused-expressions
    expect(results).to.be.undefined;
  });

  it('should return undefined for empty object', () => {
    const results = servicesMapper({});

    // eslint-disable-next-line no-unused-expressions
    expect(results).to.be.undefined;
  });

  it('should return undefined when no entries', () => {
    const results = servicesMapper({ entries: [] });

    // eslint-disable-next-line no-unused-expressions
    expect(results).to.be.undefined;
  });

  it('should return an array of services where referrals are required', () => {
    const results = servicesMapper({ entries: [gpRefService] });

    // eslint-disable-next-line no-unused-expressions
    expect(results).to.not.be.undefined;
    const gpRefs = results.gpReferrals;

    // eslint-disable-next-line no-unused-expressions
    expect(gpRefs).to.not.be.undefined;
    expect(gpRefs.length).to.equal(1);
    expect(gpRefs[0]).to.equal(gpRefService.title);
  });

  it('should return an array of services where referrals are not required', () => {
    const results = servicesMapper({ entries: [selfRefService] });

    // eslint-disable-next-line no-unused-expressions
    expect(results).to.not.be.undefined;
    const selfRefs = results.selfReferrals;

    // eslint-disable-next-line no-unused-expressions
    expect(selfRefs).to.not.be.undefined;
    expect(selfRefs.length).to.equal(1);
    expect(selfRefs[0]).to.equal(selfRefService.title);
  });
});
