const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');
const utils = require('./testUtils');

const expect = chai.expect;

chai.use(chaiHttp);

describe('app', () => {
  describe('How to register', () => {
    it('should display \'this surgery is accepting new patients\' if accepting new patients', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/E85672`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('h2.how-to-register').text()).to.equal('How to register');
          expect(utils.removeWhitespace($('p.how-to-register').text())).to.equal('This surgery is accepting new patients');
          done();
        });
    });

    it('should display \'This surgery isn\'t accepting new patients\' if accepting new patients', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/A81057001`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('h2.how-to-register').text()).to.equal('How to register');
          expect(utils.removeWhitespace($('p.how-to-register').text())).to.equal('This surgery isn\'t accepting new patients');
          done();
        });
    });
  });
});
