const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('app', () => {
  describe('Facebook Open Graph meta data', () => {
    it('should be contained in the page', (done) => {
      const url = `${constants.SITE_ROOT}/44444`;
      chai.request(app)
        .get(url)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('meta[property="og:url"]').attr('content')).to.equal(url);
          expect($('meta[property="og:type"]').attr('content')).to.equal('business.business');
          expect($('meta[property="og:title"]').attr('content')).to.equal('Chandos Medical Centre - Service Providers - NHS Choices');
          expect($('meta[property="og:image"]').attr('content')).to.equal('/gp-surgeries/images/opengraph-image.png');
          expect($('meta[property="og:image:width"]').attr('content')).to.equal('1200');
          expect($('meta[property="og:image:height"]').attr('content')).to.equal('1200');
          expect($('meta[property="business:contact_data:street_address"]').attr('content')).to.equal('123 Lidgett Lane');
          expect($('meta[property="business:contact_data:locality"]').attr('content')).to.equal('Leeds');
          expect($('meta[property="business:contact_data:postal_code"]').attr('content')).to.equal('LS8 1QR');
          expect($('meta[property="business:contact_data:country_name"]').attr('content')).to.equal('United Kingdom');
          expect($('meta[property="business:contact_data:email"]').attr('content')).to.equal('woodhouse.medicalpractice@nhs.net');
          expect($('meta[property="business:contact_data:phone_number"]').attr('content')).to.equal('0113 295 3510');
          expect($('meta[property="business:contact_data:fax_number"]').attr('content')).to.equal('0113 292 6154');
          expect($('meta[property="business:contact_data:website"]').attr('content')).to.equal('http://www.woodhousemedicalpractice.nhs.uk');
          expect($('meta[property="place:location:latitude"]').attr('content')).to.equal('53.8359870910645');
          expect($('meta[property="place:location:longitude"]').attr('content')).to.equal('-1.52137899398804');

          done();
        });
    });
  });
});
