const onHeaders = require('on-headers');

const cacheTimeoutSeconds = require('../../config/config').cacheTimeoutSeconds;

function notErrorResponse(statusCode) {
  return statusCode >= 200 && statusCode < 400;
}

function setCacheHeader(res) {
  res.setHeader('Cache-Control', `public, max-age=${cacheTimeoutSeconds}`);
}

function smartCache(req, res, next) {
  // use onHeaders to add cache control when final headers written,
  // otherwise the HTTP status may be wrong
  onHeaders(res, () => {
    if (notErrorResponse(res.statusCode)) {
      setCacheHeader(res);
    }
  });

  return next();
}

module.exports = smartCache;
