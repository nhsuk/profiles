const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('app', () => {
  describe('services', () => {
    it('should display services that are self referral', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/P92651001`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('.services').text()).to.equal('Services at this surgery');
          expect($('.services').next('h3').text()).to.equal('Services patients can book themselves');
          expect($('.self-referrals li').length).to.equal(6);
          expect($($('.self-referrals li')[0]).text()).to.equal('Asthma clinic');
          expect($($('.self-referrals li')[1]).text()).to.equal('Child vaccinations');
          expect($($('.self-referrals li')[2]).text()).to.equal('Clinic for chronic obstructive pulmonary disease (COPD)');
          expect($($('.self-referrals li')[3]).text()).to.equal('Health checks for people with learning disabilities');
          expect($($('.self-referrals li')[4]).text()).to.equal('Help with stopping smoking');
          expect($($('.self-referrals li')[5]).text()).to.equal('Travel vaccinations (not including yellow fever)');
          done();
        });
    });

    it('should display services that require a GP referral', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/A81005`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('.services').text()).to.equal('Services at this surgery');
          expect($('.services').next('h3').text()).to.equal('Services patients need to see a GP for');
          expect($('.gp-referrals li').length).to.equal(1);
          expect($($('.gp-referrals li')[0]).text()).to.equal('Minor surgery (for example removing moles)');
          done();
        });
    });

    it('should display no services when there are none', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/A81633`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('.services').text()).to.equal('');
          done();
        });
    });
  });
});
