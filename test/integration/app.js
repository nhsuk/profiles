const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');
const utils = require('./testUtils');
const promClient = require('../../app/lib/promBundle').promClient;

const expect = chai.expect;
chai.use(chaiHttp);

function expect404Page(err, res) {
  expect(err).to.not.equal(null);
  expect(res).to.have.status(404);
  // eslint-disable-next-line no-unused-expressions
  expect(res).to.be.html;
  expect(res.text).to.contain('Page not found');
}

describe('app', function test() {
  this.timeout(utils.maxWaitTimeMs);
  before((done) => {
    utils.waitForSiteReady(done);
  });

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
        .get(`${constants.SITE_ROOT}/44125`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('.local-header__title').text().trim())
            .to.equal('Park Practice');
          expect($('.gp-address').text().trim())
            .to.equal('Eastbourne Park Primary Care Centre, Broadwater Way, Eastbourne, East Sussex, BN22 9PQ');
          const contactDetailsTextFirst = $('.column--one-half:first-child p').first().text().trim();
          const contactDetailsTextLast = $('.column--one-half:first-child p').last().text().trim();

          expect(contactDetailsTextFirst).to.equal('Reception: 01323 502200');
          expect(contactDetailsTextLast).to.equal('Fax: 01323 500527');
          expect($('.gp-email').text()).to.equal('admin.parkpractice@nhs.net');
          expect($('.gp-email').attr('href')).to.equal('mailto:admin.parkpractice@nhs.net');
          expect($('.gp-website').text()).to.equal("See the surgery's own website");
          expect($('.gp-website').attr('href')).to.equal('http://www.parkpractice.co.uk');

          const choicesProfileLink = $('.choices-profile-link').prop('href');

          expect(choicesProfileLink).to.be.equal('http://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=44125');

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

  describe('metrics end point', () => {
    let responseText;

    before('make request to /metrics endpoint', (done) => {
      chai.request(app)
        .get('/metrics')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          responseText = res.text;
          done();
        });
    });

    it('should return up gauge', () => {
      expect(responseText).to.have.string('# HELP up 1 = up, 0 = not up\n# TYPE up gauge\nup 1');
    });

    it('should return app_start counter', () => {
      expect(responseText).to.have.string('# HELP app_start times the application has been started\n# TYPE app_start counter\napp_start 0');
    });

    it('should return not_found counter', () => {
      expect(responseText).to.have.string('# HELP not_found not found page has been returned\n# TYPE not_found counter\nnot_found');
    });

    it('should return gp_profile counter', () => {
      expect(responseText).to.have.string('# HELP gp_profile GP profile has been returned\n# TYPE gp_profile counter\ngp_profile');
    });

    it('should return error counter', () => {
      expect(responseText).to.have.string('# HELP error error page has been returned\n# TYPE error counter\nerror');
    });

    afterEach('clear metrics', () => {
      // Clear the metrics created when the app starts to avoid reports of:
      // Error: A metric with the name up has already been registered.
      promClient.register.clear();
    });
  });
});
