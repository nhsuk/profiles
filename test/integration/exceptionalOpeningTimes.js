const app = require('../../server');
const constants = require('../../app/lib/constants');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');
const tk = require('timekeeper');

const expect = chai.expect;

chai.use(chaiHttp);

function mockCurrentDate1() {
  return new Date('22/05/2017');
}

function mockCurrentDate2() {
  return new Date('26/05/2017');
}

function expectExceptionalOpeningTimes1($, rows, times) {
  expect($(rows[0]).text()).to.include('Thursday 25 May:');
  expect($(rows[0]).text()).to.include(times[0]);
  expect($(rows[1]).text()).to.include('Monday 29 May:');
  expect($(rows[1]).text()).to.include(times[1]);
}

function expectExceptionalOpeningTimes2($, rows, times) {
  expect($(rows[1]).text()).to.include('Monday 29 May:');
  expect($(rows[1]).text()).to.include(times[1]);
}

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
    it('should return reception and surgery opening times for the date and change the day info too', (done) => {
      tk.travel(mockCurrentDate1());
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

          const receptionRows = $('table.opening-times').first().find('tr');
          const expectedRecTimes = [
            '8am to 8pm', '8am to 6:30pm', '8am to 8pm',
            'Closed', '8am to 6:30pm', '9am to 1pm', '9am to 1pm'];
          expectOpeningTimes($, receptionRows, expectedRecTimes);

          done();
        });
      tk.reset();
    });
    it('should return reception and surgery opening times for the date and not change the day info', (done) => {
      tk.travel(mockCurrentDate2());
      chai.request(app)
        .get(`${constants.SITE_ROOT}/42056`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Changes to opening times');
          const $ = cheerio.load(res.text);

          const exceptionalRows = $('table.opening-times--exceptional').first().find('tr');
          const expectedExTimes = ['8am to 12pm', 'Closed'];
          expectExceptionalOpeningTimes2($, exceptionalRows, expectedExTimes);

          const receptionRows = $('table.opening-times').first().find('tr');
          const expectedRecTimes = [
            '8am to 8pm', '8am to 6:30pm', '8am to 8pm',
            '8am to 6:30pm', '8am to 6:30pm', '9am to 1pm', '9am to 1pm'];
          expectOpeningTimes($, receptionRows, expectedRecTimes);

          done();
        });
      tk.reset();
    });
  });
});
