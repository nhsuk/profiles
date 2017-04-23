const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');
const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('online services', () => {
  it('should display a book online link', (done) => {
    chai.request(app)
      .get(`${constants.SITE_ROOT}/44125`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);
        const bookOnline = $('.gp-book-online');

        expect(bookOnline.text()).to.be.equal('Book a GP appointment');
        expect(bookOnline.prop('href')).to.be.equal('https://patient.emisaccess.co.uk/appointments/available');

        done();
      });
  });
});
