const promClient = require('./promBundle').promClient;

module.exports = {
  applicationStarts: new promClient.Counter({ name: 'app_start', help: 'times the application has been started' }),
};
