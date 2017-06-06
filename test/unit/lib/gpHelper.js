const gpHelper = require('../../../app/lib/gpHelper');
const chai = require('chai');

const expect = chai.expect;

describe('gp counts helper', () => {
  describe('areGpsAvailable', () => {
    it('should return false missing GP counts', () => {
      const result = gpHelper.areGpsAvailable(undefined);

      expect(result).to.equal(false);
    });

    it('should return false for zero male and female GP counts', () => {
      const gpCounts = { male: 0, female: 0 };
      const result = gpHelper.areGpsAvailable(gpCounts);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.false;
    });

    it('should return true for more than one male GP counts', () => {
      const gpCounts = { male: 1, female: 0 };
      const result = gpHelper.areGpsAvailable(gpCounts);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.true;
    });

    it('should return true for more than one female GP counts', () => {
      const gpCounts = { female: 1, male: 0 };
      const result = gpHelper.areGpsAvailable(gpCounts);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.true;
    });

    it('should return false for zero unknown GP counts', () => {
      const gpCounts = { unknown: 0 };
      const result = gpHelper.areGpsAvailable(gpCounts);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.false;
    });

    it('should return true for more than one unknown GP counts', () => {
      const gpCounts = { unknown: 1 };
      const result = gpHelper.areGpsAvailable(gpCounts);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.true;
    });
  });

  describe('getGpCountMessages', () => {
    it('should return \'GPs\' for more than one male or female GP', () => {
      const gpCounts = { male: 3, female: 2 };
      const message = gpHelper.getGpCountMessages(gpCounts);

      expect(message[0]).to.equal('2 female GPs');
      expect(message[1]).to.equal('and');
      expect(message[2]).to.equal('3 male GPs');
    });

    it('should return \'GP\' for only one male or female GP', () => {
      const gpCounts = { male: 1, female: 1 };
      const message = gpHelper.getGpCountMessages(gpCounts);

      expect(message[0]).to.equal('1 female GP');
      expect(message[1]).to.equal('and');
      expect(message[2]).to.equal('1 male GP');
    });

    it('should return \'GPs\' for more than one unknown or female GP', () => {
      const gpCounts = { unknown: 2 };
      const message = gpHelper.getGpCountMessages(gpCounts);

      expect(message[0]).to.equal('2 GPs');
    });

    it('should return \'GP\' for only one unknown GP', () => {
      const gpCounts = { unknown: 1 };
      const message = gpHelper.getGpCountMessages(gpCounts);

      expect(message[0]).to.equal('1 GP');
    });
  });

  describe('getPersonSingular', () => {
    it('should return \'are\' for more than one male and more than one female GP', () => {
      const gpCounts = { male: 2, female: 2 };
      const personSingular = gpHelper.getPersonSingular(gpCounts);

      expect(personSingular).to.equal('are');
    });

    it('should return \'is\' for one male and zero female GPs', () => {
      const gpCounts = { male: 1, female: 0 };
      const personSingular = gpHelper.getPersonSingular(gpCounts);

      expect(personSingular).to.equal('is');
    });

    it('should return \'is\' for one female and zero male GPs', () => {
      const gpCounts = { male: 0, female: 1 };
      const personSingular = gpHelper.getPersonSingular(gpCounts);

      expect(personSingular).to.equal('is');
    });

    it('should return \'is\' for one female and any number of male GPs', () => {
      const gpCounts = { male: 0, female: 1 };
      const personSingular = gpHelper.getPersonSingular(gpCounts);

      expect(personSingular).to.equal('is');

      gpCounts.male = 2;
      expect(personSingular).to.equal('is');
    });
  });
});
