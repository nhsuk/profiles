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
  expect($(rows[0]).text()).to.include('Thursday 25 May');
  expect($(rows[0]).text()).to.include(times[0]);
  expect($(rows[1]).text()).to.include('Monday 29 May');
  expect($(rows[1]).text()).to.include(times[1]);
}

function expectExceptionalOpeningTimes2($, rows, times) {
  expect($(rows[0]).text()).to.not.include('Thursday 25 May');
  expect($(rows[0]).text()).to.not.include('8am to 12pm');
  expect($(rows[0]).text()).to.include('Monday 29 May');
  expect($(rows[0]).text()).to.include(times[0]);
}

describe('app', () => {
  describe('opening times with exceptional opening times in the past', () => {
    before(() => {
      tk.travel(mockCurrentDate1());
    });

    after(() => {
      tk.reset();
    });
    it('should return exceptional opening times for the date', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/42056`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Changes to opening times');
          const $ = cheerio.load(res.text);

          const exceptionalRows = $('table.opening-times--exceptional').first().find('tr');
          const expectedExTimes = ['8am to 12pm', 'Closed'];
          expectExceptionalOpeningTimes1($, exceptionalRows, expectedExTimes);

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
    it('should return exceptional opening times for the date but not the ones in the past', (done) => {
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
    });
  });

  describe('opening times with no exceptional opening times', () => {
    before(() => {
      tk.travel(mockCurrentDate2());
    });

    after(() => {
      tk.reset();
    });
    it('should not return any changed info', (done) => {
      chai.request(app)
       .get(`${constants.SITE_ROOT}/42057`)
       .end((err, res) => {
         expect(err).to.equal(null);
         expect(res).to.have.status(200);

         expect(res.text).to.not.include('Changes to opening times');
         done();
       });
    });
  });
});
