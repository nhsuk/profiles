const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');
const tk = require('timekeeper');

const app = require('../../server');
const constants = require('../../app/lib/constants');

const expect = chai.expect;

chai.use(chaiHttp);

function mockCurrentDate1() {
  const day25 = 25;
  const monthOfMay = 4; // it's expected to be off by one
  const year2017 = 2017;

  return new Date(year2017, monthOfMay, day25);
}

function mockCurrentDate2() {
  const day26 = 26;
  const monthOfMay = 4; // it's expected to be off by one
  const year2017 = 2017;

  return new Date(year2017, monthOfMay, day26);
}

function expectExceptionalOpeningTimes1($, rows) {
  expect($(rows[0]).text()).to.include('Thursday 25 May');
  expect($(rows[0]).text()).to.include('8am to 12pm');
  expect($(rows[1]).text()).to.include('Monday 29 May');
  expect($(rows[1]).text()).to.include('Closed');
}

function expectExceptionalOpeningTimes2($, rows) {
  expect($(rows[0]).text()).to.not.include('Thursday 25 May');
  expect($(rows[0]).text()).to.not.include('8am to 12pm');
  expect($(rows[0]).text()).to.include('Monday 29 May');
  expect($(rows[0]).text()).to.include('Closed');
}

describe('app', () => {
  describe('opening times with exceptional opening times', () => {
    before(() => {
      tk.travel(mockCurrentDate1());
    });

    after(() => {
      tk.reset();
    });
    it('should display changes to opening times within the next two weeks', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/B86025`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Changes to opening times');
          const $ = cheerio.load(res.text);

          const exceptionalRows = $('table.opening-times--exceptional').first().find('tr');

          expectExceptionalOpeningTimes1($, exceptionalRows);

          done();
        });
    });
  });
  describe('opening times with exceptional opening times in the past (II)', () => {
    before(() => {
      tk.travel(mockCurrentDate2());
    });

    after(() => {
      tk.reset();
    });
    it('should not display changes to opening times that occur in the past', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/B86025`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Changes to opening times');
          const $ = cheerio.load(res.text);

          const exceptionalRows = $('table.opening-times--exceptional').first().find('tr');

          expectExceptionalOpeningTimes2($, exceptionalRows);

          done();
        });
    });
  });

  describe('opening times with no exceptional opening times', () => {
    before(() => {
      tk.travel(mockCurrentDate2());
    });

    after(() => {
      tk.reset();
    });
    it('should not display any changes to opening times', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/K82005`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.not.include('Changes to opening times');
          done();
        });
    });
  });
});
