const promClient = require('./promBundle').promClient;

module.exports = {
  applicationStarts: new promClient.Counter({ name: 'app_start', help: 'times the application has been started' }),
  cacheHeader: new promClient.Counter({ name: 'cache_header', help: 'Cache-Control header set' }),
  error: new promClient.Counter({ name: 'error', help: 'error page has been returned' }),
  gpProfileRender: new promClient.Counter({ name: 'gp_profile', help: 'GP profile has been returned' }),
  notFound: new promClient.Counter({ name: 'not_found', help: 'not found page has been returned' }),
};