const app = require('../../server');
const constants = require('../../app/lib/constants');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cheerio = require('cheerio');

const expect = chai.expect;
const originalDateNow = Date.now;

chai.use(chaiHttp);


function mockDateNow() {
  // mock now = 1495451292853ms = 22nd May 2017
  return 1495451292853;
}

function expectExceptionalOpeningTimes($, rows, times) {
  expect($(rows[0]).text()).to.include('Thursday 25 May:');
  expect($(rows[0]).text()).to.include(times[0]);
  expect($(rows[1]).text()).to.include('Monday 29 May:');
  expect($(rows[1]).text()).to.include(times[1]);
}

describe('app', () => {
  describe('opening times', () => {
    beforeEach((done) => {
      Date.now = mockDateNow();
      done();
    });
    afterEach((done) => {
      Date.now = originalDateNow;
      done();
    });
    xit('should return reception and surgery opening times', (done) => {
      chai.request(app)
        .get(`${constants.SITE_ROOT}/42056`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);

          expect(res.text).to.include('Changes to opening times');
          const $ = cheerio.load(res.text);

          const exceptionalRows = $('table.exceptional-opening-times').first().find('tr');
          const expectedExTimes = ['8am to 12pm', 'Closed'];
          expectExceptionalOpeningTimes($, exceptionalRows, expectedExTimes);

          done();
        });
    });
  });
});
