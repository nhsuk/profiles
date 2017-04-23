const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');
const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('online services', () => {
  it('should display a book online link when one is available', (done) => {
    chai.request(app)
      .get(`${constants.SITE_ROOT}/44125`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);
        const bookOnlineElem = $('.gp-book-online');

        expect(bookOnlineElem.text()).to.be.equal('Book a GP appointment');
        expect(bookOnlineElem.prop('href')).to.be.equal('https://patient.emisaccess.co.uk/appointments/available');

        done();
      });
  });

  it('should not display a book online link when one is not available', (done) => {
    chai.request(app)
      .get(`${constants.SITE_ROOT}/43484`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);
        const bookOnlineElem = $('.gp-book-online');

        expect(bookOnlineElem.length).to.be.equal(0);

        done();
      });
  });

  it('should display an order repeat prescription online link when one is available', (done) => {
    chai.request(app)
      .get(`${constants.SITE_ROOT}/40565`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);
        const onlineElem = $('.repeat-prescription-online');

        expect(onlineElem.text()).to.be.equal('Order a repeat prescription');
        expect(onlineElem.prop('href')).to.be.equal('https://patient.emisaccess.co.uk/prescriptions/request');

        done();
      });
  });

  it('should not display an order repeat prescripton online link when one is not available', (done) => {
    chai.request(app)
      .get(`${constants.SITE_ROOT}/38560`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);
        const onlineElem = $('.repeat-prescription-online');

        expect(onlineElem.length).to.be.equal(0);

        done();
      });
  });
});
