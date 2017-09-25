const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

describe('app', () => {
  describe('facilities', () => {
    it('should return facilities for GP', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/P92651001`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('h2.facilities').first().text().trim()).to.equal('Parking and accessibility');

          const facilitiesList = $('ul.facilities li');

          expect(facilitiesList.length).to.equal(4);
          expect($(facilitiesList[0]).text().trim()).to.equal('Car parking');
          expect($(facilitiesList[1]).text().trim()).to.equal('Disabled toilet');
          expect($(facilitiesList[2]).text().trim()).to.equal('Step-free access');
          expect($(facilitiesList[3]).text().trim()).to.equal('Wheelchair access');
          done();
        });
    });

    it('should display no facilities section for GP without any facilities', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/A82018001`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          const $ = cheerio.load(res.text);

          expect($('h2.facilities').length).to.equal(0);
          expect($('ul.facilities li').length).to.equal(0);
          done();
        });
    });
  });
});
