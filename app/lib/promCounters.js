const promClient = require('./promBundle').promClient;

module.exports = {
  applicationStarts: new promClient.Counter({ name: 'app_start', help: 'times the application has been started' }),
  notFound: new promClient.Counter({ name: 'not_found', help: 'not found page has been returned' }),
};
