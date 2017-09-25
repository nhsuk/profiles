const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('online services', () => {
  const appointmentClass = '.gp-book-online';
  const recordsClass = '.coded-records-online';
  const scriptsClass = '.repeat-prescription-online';
  const feedbackClass = '.gp-feedback-online';

  describe('when links are avaiable', () => {
    it('should display them', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/Y02622`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);
          const appointmentElem = $(appointmentClass);
          const scriptsElem = $(scriptsClass);
          const recordsElem = $(recordsClass);
          const feedbackElem = $(feedbackClass);

          expect(appointmentElem.text()).to.be.equal('Book a GP appointment');
          expect(appointmentElem.prop('href')).to.be.equal('https://patient.emisaccess.co.uk/appointments/available');
          expect(scriptsElem.text()).to.be.equal('Get a repeat prescription');
          expect(scriptsElem.prop('href')).to.be.equal('https://patient.emisaccess.co.uk/prescriptions/request');
          expect(recordsElem.text()).to.be.equal('View your medical record');
          expect(recordsElem.prop('href')).to.be.equal('https://patient.emisaccess.co.uk/medical-record');
          expect(feedbackElem.text()).to.be.equal('Leave a review');
          expect(feedbackElem.prop('href')).to.be.equal('https://www.nhs.uk/Services/GP/LeaveReview/DefaultView.aspx?id=40565');
          done();
        });
    });
  });

  describe('when links are not available', () => {
    it('should not display them', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/A81008`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);
          const appointmentElem = $(appointmentClass);
          const scriptsElem = $(scriptsClass);
          const recordsElem = $(recordsClass);

          expect(appointmentElem.length).to.be.equal(0);
          expect(scriptsElem.length).to.be.equal(0);
          expect(recordsElem.length).to.be.equal(0);
          done();
        });
    });
  });
});
