const promClient = require('./promBundle').promClient;

module.exports = {
  applicationStarts: new promClient.Counter({ name: 'app_starts', help: 'The number of times the application has been started' }),
  error: new promClient.Counter({ name: 'error_page_views', help: 'The number of error page views' }),
  gpProfileRender: new promClient.Counter({ name: 'gp_profile_page_views', help: 'The number of GP profile page views' }),
  notFound: new promClient.Counter({ name: 'not_found_page_views', help: 'The number of not found page views' }),
};
