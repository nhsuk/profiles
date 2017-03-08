const viewLogic = require('../../app/lib/viewLogic');
const chai = require('chai');

const expect = chai.expect;

describe('view logic', () => {
  describe('gpsAvailable', () => {
    it('should return false missing gp counts', () => {
      const result = viewLogic.gpsAvailable(undefined);
      expect(result).to.equal(false);
    });

    it('should return false for zero male and female gp counts', () => {
      const gpCounts = {
        male: 0,
        female: 0
      };
      const result = viewLogic.gpsAvailable(gpCounts);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.false;
    });

    it('should return true for more than one male gp counts', () => {
      const gpCounts = {
        male: 1,
        female: 0
      };
      const result = viewLogic.gpsAvailable(gpCounts);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.true;
    });

    it('should return true for more than one female gp counts', () => {
      const gpCounts = {
        female: 1,
        male: 0
      };
      const result = viewLogic.gpsAvailable(gpCounts);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.true;
    });

    it('should return false for zero unknown gp counts', () => {
      const gpCounts = {
        unknown: 0
      };
      const result = viewLogic.gpsAvailable(gpCounts);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.false;
    });

    it('should return true for more than one unknown gp counts', () => {
      const gpCounts = {
        unknown: 1
      };
      const result = viewLogic.gpsAvailable(gpCounts);
      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.true;
    });
  });

  describe('getGpCountMessages', () => {
    it('should return \'GPs\' for more than one male or female gp', () => {
      const gpCounts = {
        male: 3,
        female: 2
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('2 female GPs');
      expect(message[1]).to.equal('3 male GPs');
    });

    it('should return \'GP\' for only one male or female gp', () => {
      const gpCounts = {
        male: 1,
        female: 1
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('1 female GP');
      expect(message[1]).to.equal('1 male GP');
    });

    it('should return \'GPs\' for more than one unknown or female gp', () => {
      const gpCounts = {
        unknown: 2
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('2 GPs');
    });

    it('should return \'GP\' for only one unknown gp', () => {
      const gpCounts = {
        unknown: 1
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('1 GP');
    });
  });
});

