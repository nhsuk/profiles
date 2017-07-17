const app = require('../../server');
const constants = require('../../app/lib/constants');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('smartCache', () => {
  it('should set cache-control header for valid page', (done) => {
    chai.request(app)
      .get(`${constants.SITE_ROOT}/44125`)
      .end((err, res) => {
        expect(res).to.have.header('Cache-Control', 'public, max-age=60');
        done();
      });
  });
  it('should not set cache-control for page not found', (done) => {
    chai.request(app)
      .get(`${constants.SITE_ROOT}/a404Page`)
      .end((err, res) => {
        expect(res).to.not.have.header('Cache-Control', 'public, max-age=60');
        done();
      });
  });
});
