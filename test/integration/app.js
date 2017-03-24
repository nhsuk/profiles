const app = require('../../server');
const constants = require('../../app/lib/constants');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const expect = chai.expect;

chai.use(chaiHttp);

function expect404Page(err, res) {
  expect(err).to.not.equal(null);
  expect(res).to.have.status(404);
  // eslint-disable-next-line no-unused-expressions
  expect(res).to.be.html;
  expect(res.text).to.contain('Page not found');
}

describe('app', () => {
  describe('security headers', () => {
    it('should be returned for a valid request', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.header('X-Xss-Protection', '1; mode=block');
          expect(res).to.have.header('X-Frame-Options', 'DENY');
          expect(res).to.have.header('X-Content-Type-Options', 'nosniff');
          expect(res).to.have.header('X-Download-Options', 'noopen');
          expect(res).to.not.have.header('X-Powered-By');
          done();
        });
    });
  });

  describe('redirect to root of app', () => {
    it('should return a 404 response as html', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect404Page(err, res);
          done();
        });
    });
  });

  describe('direct access to the root of the app', () => {
    it('should return a 404 response as html', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}`)
        .end((err, res) => {
          expect404Page(err, res);
          done();
        });
    });
  });

  describe('existing GP page', () => {
    it('should return a GP Page for a valid Org Code', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/43213`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('.local-header__title').text().trim())
            .to.equal('Dr C A Xavier');
          expect($('.column--one-half').first().text().trim())
            .to.equal('647 Liverpool RoadPlatt BridgeWigangreater manchesterWN2 5BD');
          const contactDetailsText = $('.column--one-half p').last().text().trim();
          expect(contactDetailsText).to.include('Telephone: 01942 862738');
          expect(contactDetailsText).to.include('Email: gp-p92651@nhs.net');
          expect(contactDetailsText).to.include('Fax: 01942 865171');

          const bookOnlineLink = $('.link-list').find('a').eq(0).prop('href');
          expect(bookOnlineLink).to.be.equal('https://patient.emisaccess.co.uk/appointments/available');
          done();
        });
    });
  });

  describe('an unknown page', () => {
    it('should return a 404', (done) => {
      chai.request(app)
        .get('/not-known')
        .end((err, res) => {
          expect404Page(err, res);
          done();
        });
    });
  });

  describe('non-existant GP', () => {
    it('should return a 404', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/unknown`)
        .end((err, res) => {
          expect404Page(err, res);
          done();
        });
    });
  });

  describe('non-existant GP but parseable as int', () => {
    it('should return a 404', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/1unknown`)
        .end((err, res) => {
          expect404Page(err, res);
          done();
        });
    });
  });
});
