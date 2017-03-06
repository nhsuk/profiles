const viewLogic = require('../../app/lib/viewLogic');
const chai = require('chai');

const expect = chai.expect;

describe('view logic', () => {
  describe('GP Counts', () => {
    it('should return \'none\' missing gp counts', () => {
      const message = viewLogic.getGpCountMessages(undefined);
      expect(message[0]).to.equal('None');
    });

    it('should return \'None\' for zero male and female gp counts', () => {
      const gpCounts = {
        male: 0,
        female: 0
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('None');
    });

    it('should return \'None\' for zero unknown gp counts', () => {
      const gpCounts = {
        unknown: 0
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('None');
    });

    it('should return \'GPs\' for more than one male or female doctor', () => {
      const gpCounts = {
        male: 3,
        female: 2
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('2 female GPs');
      expect(message[1]).to.equal('3 male GPs');
    });

    it('should return \'GP\' for only one male or female doctor', () => {
      const gpCounts = {
        male: 1,
        female: 1
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('1 female GP');
      expect(message[1]).to.equal('1 male GP');
    });

    it('should return \'GPs\' for more than one unknown or female doctor', () => {
      const gpCounts = {
        unknown: 2
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('2 GPs');
    });

    it('should return \'GP\' for only one unknown doctor', () => {
      const gpCounts = {
        unknown: 1
      };
      const message = viewLogic.getGpCountMessages(gpCounts);
      expect(message[0]).to.equal('1 GP');
    });
  });
});

