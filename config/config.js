const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);

module.exports = {
  app: {
    name: 'profiles',
  },
  env: process.env.NODE_ENV || 'development',
  root: rootPath,
  port: process.env.PORT || 3000,
  es: {
    host: process.env.ES_HOST || 'es',
    port: process.env.ES_PORT || '9200',
    index: process.env.ES_INDEX || 'profiles',
  },
  hotjarId: process.env.HOTJAR_ANALYTICS_TRACKING_ID,
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  webtrendsId: process.env.WEBTRENDS_ANALYTICS_TRACKING_ID,
  cacheTimeoutSeconds: process.env.CACHE_TIMEOUT_SECONDS || 0,
  choicesUrl: process.env.CHOICES_URL || 'https://www.nhs.uk'
};
