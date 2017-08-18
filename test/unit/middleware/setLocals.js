const chai = require('chai');
const setLocals = require('../../../app/middleware/setLocals');

const expect = chai.expect;

describe('setLocals', () => {
  describe('backLink', () => {
    const referer = 'http://web.site.com';

    function getReferer() { return referer; }
    function noReferer() { return ''; }
    function mockNext() { }

    const mockReqWithReferer = { get: getReferer };
    const mockReqWithNoReferer = { get: noReferer };
    const mockRes = { locals: {} };

    it('it should be set to the referer when there is one', () => {
      setLocals.backLink(mockReqWithReferer, mockRes, mockNext);

      // eslint-disable-next-line no-script-url
      expect(mockRes.locals.backLink).to.equal(referer);
    });

    it('should return the referer when there is one', () => {
      setLocals.backLink(mockReqWithNoReferer, mockRes, mockNext);

      // eslint-disable-next-line no-script-url
      expect(mockRes.locals.backLink).to.equal('javascript:history.back();');
    });
  });
});
