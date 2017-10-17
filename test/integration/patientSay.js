const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('what patients say links', () => {
  it('should link to the correct external site', (done) => {
    const ratingsReviewsClass = '.gp-ratings-reviews';
    const patientSurveyClass = '.gp-patient-survey';

    chai.request(app)
      .get(`${constants.SITE_ROOT}/Y02622`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);

        const $ = cheerio.load(res.text);
        const ratingsReviewsElem = $(ratingsReviewsClass);
        const patientSurveyElem = $(patientSurveyClass);

        expect(ratingsReviewsElem.text()).to.be.equal('ratings and reviews');
        expect(ratingsReviewsElem.prop('href')).to.be.equal('https://www.nhs.uk/Services/GP/ReviewsAndRatings/DefaultView.aspx?id=40565');
        expect(patientSurveyElem.text()).to.be.equal('GP Patient Survey results');
        expect(patientSurveyElem.prop('href')).to.be.equal('https://gp-patient.co.uk/report?practicecode=Y02622');

        done();
      });
  });
});
