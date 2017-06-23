const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');
const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

function removeDay(days, day) {
  const indexOfDay = days.indexOf(day);
  days.splice(indexOfDay);
}

function expectValidOpeningHoursSpecification(openingHours) {
  const days = constants.daysOfWeekOrderedForUi;
  openingHours.forEach((day) => {
    expect(day['@type']).equal('OpeningHoursSpecification');
    expect(day.dayOfWeek['@type']).equal('DayOfWeek');
    expect(day.description).equal('Reception');
    expect(day.opens).to.be.oneOf(['8am to 6pm', '8am to 12pm', 'Closed']);
    expect(day.closes).to.be.oneOf(['8am to 6pm', '8am to 12pm', 'Closed']);
    removeDay(days, day);
  });
  expect(days.length).to.equal(0);
}

describe('app', () => {
  describe('Schema.org information', () => {
    it('should be contained in the page', (done) => {
      chai.request(app)
      .get(`${constants.SITE_ROOT}/41772`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);
        const jsonLdText = $('script[type="application/ld+json"]').text();

        const jsonLd = JSON.parse(jsonLdText);
        expect(jsonLd['@context']).to.equal('http://schema.org');
        expect(jsonLd['@type']).to.equal('Physician');
        expect(jsonLd.name).to.equal('Springwood Surgery');
        expect(jsonLd.telephone).to.equal('01287 619611');
        expect(jsonLd.email).to.equal('rc-pct.Springwood@nhs.net');
        expect(jsonLd.identifier).to.equal('A81005');
        expect(jsonLd.address['@type']).to.equal('PostalAddress');
        expect(jsonLd.address.streetAddress).to.equal('Guisborough');
        expect(jsonLd.address.addressLocality).to.equal('');
        expect(jsonLd.address.postalCode).to.equal('TS14 7DJ');
        expect(jsonLd.geo['@type']).to.equal('GeoCoordinates');
        expect(jsonLd.geo.latitude).to.equal('-1.05542838573456');
        expect(jsonLd.geo.longitude).to.equal('54.532600402832');
        expect(jsonLd.url).to.equal('http://www.springwoodsurgery.co.uk/');
        expect(jsonLd.isAcceptingNewPatients).to.equal('true');
        expectValidOpeningHoursSpecification(jsonLd.openingHoursSpecification);
        done();
      });
    });
  });
});
