1.6.0 / TBD
===================
- Update npm dependencies
- Upgrade python in Alpine to 2.7.14-r0

1.5.0 / 2018-01-02
===================
- Update npm dependencies

1.4.5 / 2017-11-28
===================
- Fix Webtrends 'undefined' bug
- Update express

1.4.4 / 2017-11-16
===================
- Update to latest version of the frontend library

1.4.3 / 2017-11-14
===================
- Ensure cookie banner supports IE7+
- Fix Google Analytics script
- Add Brunch for front-end static asset minification, compression and cache busting
- Add ADR for the use of Brunch
- Update npm dependencies
- Upgrade Docker container to `node:8.9.1-alpine`

1.3.0 / 2017-10-31
===================
- Add basic authentication to service when running test environments in Rancher
- Upgrade Docker container to `node:8.8.1-alpine`
- Update npm dependencies

1.2.0 / 2017-10-17
===================
- Add link to allow GP profile editors to login and edit via PIMS
- Be less specific about third party domains within content security policy
- Performance tests use threshold of 500ms
- Update performance test IDs to ODS Codes

1.1.0 / 2017-10-10
===================
- Exclude subdomains from Strict-Transport-Security header
- Update npm dependencies

1.0.1 / 2017-10-03
===================
- The gp-surgeries endpoint now supports both the Choices ID and the ODS code, using the presence of a letter to distinguish between them
  If the URL is visited with a Choices ID, it will re-direct to the ODS code
- Update npm dependencies
- Fix logging bug

0.19.1 / 2017-09-13
===================
- Fix date format in CHANGELOG

0.19.0 / 2017-09-12
===================
- Update all npm dependencies
- Misc back end improvements
- Add instrumentation to app
- Expose app metrics for Prometheus collection
- Add CHANGELOG

0.18.0 / 2017-09-01
===================
- Add machine readable metadata for Facebook, Twitter and Schema.org
- Add aria labels
- Migrate from MongoDB to Elasticsearch

0.17.0 / 2017-08-19
===================
- Add performance tests
- Allow setting of container scale with ENV variable
- Send logs to Splunk in JSON
- Update frontend-library version to `0.5.0`
- Accessibility updates
- Update application dependencies
- Encode maps URL

0.16.0 / 2017-08-24
===================
- Migrate app to use frontend-library

0.15.1 / 2017-07-17
===================
- Improve logging

0.15.0 / 2017-07-13
===================
- Upgrade Docker container to run node `8.1.4`

0.14.0 / 2017-07-11
===================
- Update all npm dependencies
- Tidy up some back end stuff

0.13.1 / 2017-06-29
===================
- Add ratings and review links
- Use vault in deployment scripts

0.12.1 / 2017-06-27
===================
- Add faxNumber to JSON+LD output

0.12.0 / 2017-06-26
===================
- Add ADRs
- Misc back end improvements
- Expose profile data in JSON+LD format

0.11.1 / 2017-06-05
===================
- Change error title font colour

0.11.0 / 2017-06-05
===================
- Updated table styles on mobile, to retain horizontal style when displaying two columns
- Implemented latest content changes from prototype

0.10.0 / 2017-05-31
===================
- Misc back end and test improvements

0.9.1 / 2017-05-25
==================
- Add exceptional opening times
- Add custom tracking

0.9.0 / 2017-05-25
==================
- Misc back end improvements

< 0.9.0
=======
- Initial work on application
