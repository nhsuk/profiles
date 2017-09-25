const chai = require('chai');

const esClient = require('../../app/lib/esClient');
const utils = require('./testUtils');

const expect = chai.expect;

describe('Elasticsearch Client', function test() {
  this.timeout(utils.maxWaitTimeMs);
  before((done) => {
    utils.waitForSiteReady(done);
  });

  describe('getGpByChoicesId', () => {
    it('should return GP by choicesId', async () => {
      const choicesId = 43213;
      const gp = await esClient.getGpByChoicesId(choicesId);
      expect(gp.choicesId).to.equal(choicesId);
    });

    it('should return undefined for unknown choicesId', async () => {
      const gp = await esClient.getGpByChoicesId(33333333);
      // eslint-disable-next-line no-unused-expressions
      expect(gp).to.be.undefined;
    });
  });

  describe('getGpByOdsCode', () => {
    it('should return GP by odsCode', async () => {
      const odsCode = 'B82609001';
      const gp = await esClient.getGpByOdsCode(odsCode);
      expect(gp.odsCode).to.equal(odsCode);
    });

    it('should return undefined for unknown odsCode', async () => {
      const gp = await esClient.getGpByOdsCode('noSuchCode');
      // eslint-disable-next-line no-unused-expressions
      expect(gp).to.be.undefined;
    });
  });
});
