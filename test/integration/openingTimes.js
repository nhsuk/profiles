const app = require('../../server');
const constants = require('../../app/lib/constants');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const expect = chai.expect;

chai.use(chaiHttp);

function expectOpeningTimes($, rows, times) {
  expect($(rows[0]).text()).to.include('Monday');
  expect($(rows[0]).text()).to.include(times[0]);
  expect($(rows[1]).text()).to.include('Tuesday');
  expect($(rows[1]).text()).to.include(times[1]);
  expect($(rows[2]).text()).to.include('Wednesday');
  expect($(rows[2]).text()).to.include(times[2]);
  expect($(rows[3]).text()).to.include('Thursday');
  expect($(rows[3]).text()).to.include(times[3]);
  expect($(rows[4]).text()).to.include('Friday');
  expect($(rows[4]).text()).to.include(times[4]);
  expect($(rows[5]).text()).to.include('Saturday');
  expect($(rows[5]).text()).to.include(times[5]);
  expect($(rows[6]).text()).to.include('Sunday');
  expect($(rows[6]).text()).to.include(times[6]);
}

describe('app', () => {
  describe('opening times', () => {
    it('should return reception and surgery opening times', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/43213`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Reception opening times');
          expect(res.text).to.include('GP appointment times');
          const $ = cheerio.load(res.text);

          const receptionRows = $('table.opening-times').first().find('tr');
          const expectedRecTimes = [
            '8am to 6:30pm', '8am to 6:30pm', '8am to 1pm',
            '8am to 6:30pm', '8am to 6:30pm', 'Closed', 'Closed'];
          expectOpeningTimes($, receptionRows, expectedRecTimes);

          const surgeryRows = $('table.opening-times').last().find('tr');
          const expectedSurTimes = [
            '8am to 6:30pm', '8am to 6:30pm', '8am to 1pm',
            '8am to 6:30pm', '8am to 6:30pm', 'Closed', 'Closed'];
          expectOpeningTimes($, surgeryRows, expectedSurTimes);

          done();
        });
    });
  });
});
