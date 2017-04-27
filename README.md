# Profiles

[![Build Status](https://travis-ci.org/nhsuk/profiles.svg?branch=master)](https://travis-ci.org/nhsuk/profiles)
[![Coverage Status](https://coveralls.io/repos/github/nhsuk/profiles/badge.svg?branch=master)](https://coveralls.io/github/nhsuk/profiles?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/nhsuk/profiles/badge.svg)](https://snyk.io/test/github/nhsuk/profiles)

A collection of health service provider profiles. Initially containing GP
practices and Pharmacies.

## Environment variables

Environment variables are expected to be managed by the environment in which
the application is being run. This is best practice as described by
[twelve-factor](https://12factor.net/config).

| Variable                         | Description                                                        | Default               | Required |
|:---------------------------------|:-------------------------------------------------------------------|-----------------------|:---------|
| `NODE_ENV`                       | node environment                                                   | development           |          |
| `LOG_LEVEL`                      | [log level](https://github.com/trentm/node-bunyan#levels)          | Depends on `NODE_ENV` |          |
| `PORT`                           | server port                                                        | 3000                  |          |
| `GOOGLE_ANALYTICS_TRACKING_ID`   | [Google Analytics](https://www.google.co.uk/analytics) property id |                       |          |
| `WEBTRENDS_ANALYTICS_TRACKING_ID`| [Webtrends](https://www.webtrends.com/) tracking id                |                       |          |
| `HOTJAR_ANALYTICS_TRACKING_ID`   | [Hotjar](https://www.hotjar.com/) tracking id                      |                       |          |

## Working on the application

Start by cloning the repo and all submodules i.e.
`git clone https://github.com/nhsuk/profiles.git && cd profiles/ && git submodule update --init --recursive`

Next, check out the set of scripts for getting the application running
[`scripts`](scripts/)
