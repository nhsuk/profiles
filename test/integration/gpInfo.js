const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');
const utils = require('./testUtils');

const expect = chai.expect;

chai.use(chaiHttp);

describe('app', () => {
  describe('GP Info', () => {
    it('should display female and male GP counts', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/A81005`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('h2.gp-info').text()).to.equal('GPs at this surgery');
          expect(utils.removeWhitespace($('p.gp-info').text())).to.equal('There are 5 female GPs and 1 male GP');
          expect($('ul.gp-info li').length).to.equal(6);
          done();
        });
    });

    it('should display no GP Info when there is none', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/A81015`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('.gp-info').text()).to.equal('');
          done();
        });
    });
  });
});
