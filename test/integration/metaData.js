const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('The application\'s meta data', () => {
  const odsCode = 'B86049001';
  const requestUrl = `${constants.SITE_ROOT}/${odsCode}`;
  const name = 'Chandos Medical Centre';
  const streetAddress = '123 Lidgett Lane, Leeds, West Yorkshire';
  const postcode = 'LS8 1QR';
  const country = 'United Kingdom';
  const email = 'woodhouse.medicalpractice@nhs.net';
  const telephone = '0113 295 3510';
  const faxNumber = '0113 292 6154';
  const website = 'http://www.woodhousemedicalpractice.nhs.uk';
  const latitude = '53.8359870910645';
  const longitude = '-1.52137899398804';
  const acceptingNewPatients = 'true';
  const type = 'Physician';
  const hostNameAndProtocol = 'https://127.0.0.1';

  describe('for Schema.org', () => {
    it('should be contained in the page', (done) => {
      chai.request(app)
        .get(requestUrl)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);
          const jsonLdText = $('script[type="application/ld+json"]').html();

          const jsonLd = JSON.parse(jsonLdText);
          expect(jsonLd['@context']).to.equal('http://schema.org');
          expect(jsonLd['@type']).to.equal(type);
          expect(jsonLd.address['@type']).to.equal('PostalAddress');
          expect(jsonLd.address.streetAddress).to.equal(streetAddress);
          expect(jsonLd.address.postalCode).to.equal(postcode);
          expect(jsonLd.email).to.equal(email);
          expect(jsonLd.faxNumber).to.equal(faxNumber);
          expect(jsonLd.geo['@type']).to.equal('GeoCoordinates');
          expect(jsonLd.geo.latitude).to.equal(latitude);
          expect(jsonLd.geo.longitude).to.equal(longitude);
          expect(jsonLd.identifier).to.equal(odsCode);
          expect(jsonLd.isAcceptingNewPatients).to.equal(acceptingNewPatients);
          expect(jsonLd.name).to.equal(name);
          expect(jsonLd.telephone).to.equal(telephone);
          expect(jsonLd.url).to.equal(website);
          const receptionOpeningTimes = jsonLd.openingHoursSpecification.filter(x => x.description === 'Reception');
          const surgeryOpeningTimes = jsonLd.openingHoursSpecification.filter(x => x.description === 'Surgery');
          expect(receptionOpeningTimes.length).to.equal(7);
          expect(surgeryOpeningTimes.length).to.equal(8);
          done();
        });
    });
  });

  describe('for Facebook Open Graph', () => {
    it('should be contained in the page', (done) => {
      chai.request(app)
        .get(requestUrl)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('meta[property="og:url"]').attr('content')).to.equal(`${hostNameAndProtocol}${requestUrl}`);
          expect($('meta[property="og:type"]').attr('content')).to.equal('business.business');
          expect($('meta[property="og:title"]').attr('content')).to.equal(`${name} - GP - NHS Choices`);
          expect($('meta[property="og:description"]').attr('content')).to.equal(`Official information from NHS Choices about ${name} including contact details, directions, opening hours and service/treatment details.`);
          expect($('meta[property="og:image"]').attr('content')).to.equal(`${hostNameAndProtocol}/gp-surgeries/images/opengraph-image.png`);
          expect($('meta[property="og:image:width"]').attr('content')).to.equal('1200');
          expect($('meta[property="og:image:height"]').attr('content')).to.equal('1200');
          expect($('meta[property="business:contact_data:street_address"]').attr('content')).to.equal(streetAddress);
          expect($('meta[property="business:contact_data:postal_code"]').attr('content')).to.equal(postcode);
          expect($('meta[property="business:contact_data:country_name"]').attr('content')).to.equal(country);
          expect($('meta[property="business:contact_data:email"]').attr('content')).to.equal(email);
          expect($('meta[property="business:contact_data:phone_number"]').attr('content')).to.equal(telephone);
          expect($('meta[property="business:contact_data:fax_number"]').attr('content')).to.equal(faxNumber);
          expect($('meta[property="business:contact_data:website"]').attr('content')).to.equal(website);
          expect($('meta[property="place:location:latitude"]').attr('content')).to.equal(latitude);
          expect($('meta[property="place:location:longitude"]').attr('content')).to.equal(longitude);

          const actualOpenDays = [];
          $('meta[property="business:hours:day"]').each((i, elm) => {
            actualOpenDays.push($(elm).attr('content'));
          });
          const expectedOpenDays =
            constants.daysOfWeekOrderedForUi.map(d => d.toLowerCase()).slice(0, 5);

          expect($('meta[property="business:hours:day"]').length).to.equal(5);
          expect(actualOpenDays).to.deep.equal(expectedOpenDays);
          expect($('meta[property="business:hours:start"]').length).to.equal(7);
          expect($('meta[property="business:hours:end"]').length).to.equal(7);
          expect($('meta[property="business:hours:start"]').attr('content')).to.equal('08:15');
          expect($('meta[property="business:hours:end"]').attr('content')).to.equal('12:00');

          done();
        });
    });
  });

  describe('for Webtrends', () => {
    it('should be contained in the page', (done) => {
      chai.request(app)
        .get(requestUrl)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('meta[name="DCSext.CTSServiceName"]').attr('content')).to.equal(name);
          expect($('meta[name="DCSext.CTSServiceType"]').attr('content')).to.equal('GP');

          done();
        });
    });
  });

  describe('for NHS', () => {
    it('should be contained in the page', (done) => {
      chai.request(app)
        .get(requestUrl)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('meta[name="nhs:providers:type"]').attr('content')).to.equal(type);
          expect($('meta[name="nhs:providers:identifier"]').attr('content')).to.equal(odsCode);
          expect($('meta[name="nhs:providers:isAcceptingNewPatients"]').attr('content')).to.equal(acceptingNewPatients);

          done();
        });
    });
  });

  describe('for Twitter card with large image', () => {
    it('should be contained in the page', (done) => {
      chai.request(app)
        .get(requestUrl)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('meta[name="twitter:card"]').attr('content')).to.equal('summary_large_image');
          expect($('meta[name="twitter:site"]').attr('content')).to.equal('@NHSChoices');
          expect($('meta[name="twitter:creator"]').attr('content')).to.equal('@NHSChoices');

          done();
        });
    });
  });
});
