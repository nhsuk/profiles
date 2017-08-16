const qs = require('querystring');
const chai = require('chai');
const mapLink = require('../../../app/lib/mapLink.js');

const expect = chai.expect;

describe('mapLink', () => {
  it('returns a fully qualified, URI encoded google map url', () => {
    const gp = {};
    gp.name = 'Gilberdyke Health Centre';
    gp.address = {};
    gp.address.addressLines = 'The Health & Centre,Thornton Dam Lane,Gilberdyke,Gilberdyke';
    gp.address.postcode = 'HU15 2UL';

    const expectedQuery = `${gp.name},${gp.address.addressLines},${gp.address.postcode}`;
    const encodedQuery = qs.escape(expectedQuery);
    const expectedResult = `https://maps.google.com/?q=${encodedQuery}`;

    const result = mapLink.generateUrl(gp);

    expect(result).to.be.equal(expectedResult);
  });
});
