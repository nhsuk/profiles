const chai = require('chai');
const utils = require('../../../app/lib/utils');

const expect = chai.expect;

describe('utils', () => {
  describe('sortIgnoreCase', () => {
    it('should sort alphabetically ignoring case', () => {
      const array = ['dog', 'cat', 'Alpaca', 'Elephant'];
      const result = utils.sortIgnoreCase(array);

      expect(result[0]).to.be.equal('Alpaca');
      expect(result[1]).to.be.equal('cat');
      expect(result[2]).to.be.equal('dog');
      expect(result[3]).to.be.equal('Elephant');
    });

    it('should gracefully handle undefined array items', () => {
      const array = ['dog', 'cat', 'Alpaca', undefined, 'Elephant'];
      const result = utils.sortIgnoreCase(array);

      expect(result[0]).to.be.equal('Alpaca');
      expect(result[1]).to.be.equal('cat');
      expect(result[2]).to.be.equal('dog');
      expect(result[3]).to.be.equal('Elephant');
    });

    it('should sort gracefully handle undefined parameter', () => {
      const result = utils.sortIgnoreCase(undefined);

      // eslint-disable-next-line no-unused-expressions
      expect(result).to.be.undefined;
    });
  });
});
