const chai = require('chai');
const mapLink = require('../../../app/lib/mapLink.js');

const expect = chai.expect;

describe('mapLink', () => {
  it('returns a fully qualified google map url', () => {
    const gp = {};
    gp.name = 'Gilberdyke Health Centre';
    gp.address = {};
    gp.address.addressLines = 'The Health Centre,Thornton Dam Lane,Gilberdyke,Gilberdyke';
    gp.address.postcode = 'HU15 2UL';
    const expectedResult = 'https://maps.google.com/?q=Gilberdyke+Health+Centre,The+Health+Centre,Thornton+Dam+Lane,Gilberdyke,Gilberdyke,HU15+2UL';
    const result = mapLink.generateUrl(gp);

    expect(result).to.be.equal(expectedResult);
  });
});
