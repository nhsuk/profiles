const config = require('../../config/config');
const chai = require('chai');

const expect = chai.expect;

describe('config', () => {
  describe('app', () => {
    it('should return name as profiles', () => {
      expect(config.app.name).to.be.equal('profiles');
    });
  });

  describe('root level items', () => {
    it('should return env as test during test', () => {
      expect(config.env).to.be.equal('test');
    });
    it('should return default port as 3000', () => {
      expect(config.port).to.be.equal(3000);
    });
  });
});

