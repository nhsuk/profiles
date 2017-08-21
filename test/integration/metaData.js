const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('The application\'s meta data', () => {
  const requestUrl = `${constants.SITE_ROOT}/44444`;
  const odsCode = 'B86049';
  const name = 'Chandos Medical Centre';
  const streetAddress = '123 Lidgett Lane';
  const locality = 'Leeds';
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
          expect(jsonLd.address.addressLocality).to.equal(locality);
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
          expect($('meta[property="og:title"]').attr('content')).to.equal(`${name} - Service Providers - NHS Choices`);
          expect($('meta[property="og:image"]').attr('content')).to.equal(`${hostNameAndProtocol}/gp-surgeries/images/opengraph-image.png`);
          expect($('meta[property="og:image:width"]').attr('content')).to.equal('1200');
          expect($('meta[property="og:image:height"]').attr('content')).to.equal('1200');
          expect($('meta[property="business:contact_data:street_address"]').attr('content')).to.equal(streetAddress);
          expect($('meta[property="business:contact_data:locality"]').attr('content')).to.equal(locality);
          expect($('meta[property="business:contact_data:postal_code"]').attr('content')).to.equal(postcode);
          expect($('meta[property="business:contact_data:country_name"]').attr('content')).to.equal(country);
          expect($('meta[property="business:contact_data:email"]').attr('content')).to.equal(email);
          expect($('meta[property="business:contact_data:phone_number"]').attr('content')).to.equal(telephone);
          expect($('meta[property="business:contact_data:fax_number"]').attr('content')).to.equal(faxNumber);
          expect($('meta[property="business:contact_data:website"]').attr('content')).to.equal(website);
          expect($('meta[property="place:location:latitude"]').attr('content')).to.equal(latitude);
          expect($('meta[property="place:location:longitude"]').attr('content')).to.equal(longitude);

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
});
