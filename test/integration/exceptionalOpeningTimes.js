const app = require('../../server');
const constants = require('../../app/lib/constants');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');
const tk = require('timekeeper');

const expect = chai.expect;

chai.use(chaiHttp);

function mockCurrentDate1() {
  return new Date('2017', '04', '25');
}

function mockCurrentDate2() {
  return new Date('2017', '04', '26');
}

function expectExceptionalOpeningTimes1($, rows, times) {
  expect($(rows[0]).text()).to.include('Monday 29 May');
  expect($(rows[0]).text()).to.include(times[0]);
}

function expectExceptionalOpeningTimes2($, rows, times) {
  expect($(rows[0]).text()).to.include('Monday 29 May');
  expect($(rows[0]).text()).to.include(times[0]);
}

describe('app', () => {
  describe('opening times', () => {
    it('should return exceptional opening times for the date', (done) => {
      tk.travel(mockCurrentDate1());
      chai.request(app)
        .get(`${constants.SITE_ROOT}/42056`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Changes to opening times');
          const $ = cheerio.load(res.text);

          const exceptionalRows = $('table.opening-times--exceptional').first().find('tr');
          const expectedExTimes = ['Closed'];
          expectExceptionalOpeningTimes1($, exceptionalRows, expectedExTimes);

          done();
        });
      tk.reset();
    });
    it('should return exceptional opening times for the date but not the ones in the past', (done) => {
      tk.travel(mockCurrentDate2());
      chai.request(app)
        .get(`${constants.SITE_ROOT}/42056`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Changes to opening times');
          const $ = cheerio.load(res.text);

          const exceptionalRows = $('table.opening-times--exceptional').first().find('tr');
          const expectedExTimes = ['Closed'];
          expectExceptionalOpeningTimes2($, exceptionalRows, expectedExTimes);

          done();
        });
      tk.reset();
    });
    it('should return reception and surgery opening times for the date but not the ones in the past', (done) => {
      tk.travel(mockCurrentDate1());
      chai.request(app)
        .get(`${constants.SITE_ROOT}/42057`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.not.include('Changes to opening times');
          done();
        });
      tk.reset();
    });
  });
});
