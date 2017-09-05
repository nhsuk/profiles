const onHeaders = require('on-headers');
const cacheHeaderCounter = require('../lib/promCounters').cacheHeader;

function notErrorResponse(statusCode) {
  return statusCode >= 200 && statusCode < 400;
}

function setCacheHeader(res, settings) {
  res.setHeader('Cache-Control', `public, max-age=${settings.maxAge}`);
}

function smartCache(settings) {
  return (req, res, next) => {
    onHeaders(res, () => {
      if (notErrorResponse(res.statusCode)) {
        cacheHeaderCounter.inc(1);
        setCacheHeader(res, settings);
      }
    });
    return next();
  };
}

module.exports = smartCache;
