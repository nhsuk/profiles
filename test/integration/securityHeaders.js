const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../server');
const utils = require('./testUtils');

const expect = chai.expect;
chai.use(chaiHttp);

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
          expect(res).to.have.header('Content-Security-Policy', 'default-src \'self\'; child-src https://*.hotjar.com:*; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\' data: www.google-analytics.com s.webtrends.com statse.webtrendslive.com static.hotjar.com script.hotjar.com cdn.jsdelivr.net; img-src \'self\' data: static.hotjar.com www.google-analytics.com statse.webtrendslive.com hm.webtrends.com; style-src \'self\' \'unsafe-inline\' assets.nhs.uk; font-src assets.nhs.uk; connect-src \'self\' https://*.hotjar.com:* wss://*.hotjar.com');
          expect(res).to.have.header('X-Xss-Protection', '1; mode=block');
          expect(res).to.have.header('X-Frame-Options', 'DENY');
          expect(res).to.have.header('X-Content-Type-Options', 'nosniff');
          expect(res).to.have.header('X-Download-Options', 'noopen');
          expect(res).to.not.have.header('X-Powered-By');
          expect(res).to.have.header('Strict-Transport-Security', 'max-age=15552000');
          done();
        });
    });
  });
});
