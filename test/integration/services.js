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
      .get(`${constants.SITE_ROOT}/43213`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);

        expect($('.services').text()).to.equal('Services at this surgery');
        expect($('.services').next('h3').text()).to.equal('Services patients can book themselves');
        expect($('.self-referrals li').length).to.equal(6);
        expect($($('.self-referrals li')[0]).text()).to.equal('Asthma Clinic');
        expect($($('.self-referrals li')[1]).text()).to.equal('Child Immunisations');
        expect($($('.self-referrals li')[2]).text()).to.equal('COPD clinic with spirometry');
        expect($($('.self-referrals li')[3]).text()).to.equal('Learning disability health check');
        expect($($('.self-referrals li')[4]).text()).to.equal('Smoking cessation clinic');
        expect($($('.self-referrals li')[5]).text()).to.equal('Travel health without yellow fever');
        done();
      });
    });

    it('should display services that require a GP referral', (done) => {
      chai.request(app)
      .get(`${constants.SITE_ROOT}/41772`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);

        expect($('.services').text()).to.equal('Services at this surgery');
        expect($('.services').next('h3').text()).to.equal('Services that need a GP referral');
        expect($('.gp-referrals li').length).to.equal(1);
        expect($($('.gp-referrals li')[0]).text()).to.equal('Minor surgery (e.g. removal of moles and skin lesions) - provided in-house');
        done();
      });
    });

    it('should display no services when there are none', (done) => {
      chai.request(app)
      .get(`${constants.SITE_ROOT}/46158`)
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
