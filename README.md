# **DEPRECATED** - no longer actively maintained

---

# Profiles

[![GitHub Release](https://img.shields.io/github/release/nhsuk/profiles.svg)](https://github.com/nhsuk/profiles/releases/latest/)
[![Greenkeeper badge](https://badges.greenkeeper.io/nhsuk/profiles.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/nhsuk/profiles.svg?branch=master)](https://travis-ci.org/nhsuk/profiles)
[![Coverage Status](https://coveralls.io/repos/github/nhsuk/profiles/badge.svg?branch=master)](https://coveralls.io/github/nhsuk/profiles?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/nhsuk/profiles/badge.svg)](https://snyk.io/test/github/nhsuk/profiles)

> A collection of health service provider profiles. Initially containing GP
practices and Pharmacies.

## Test environments

As the application is being developed, every Pull Request has its own test
environment automatically built and deployed to.

Every environment apart from the one we want the public to access requires
basic authentication to access. The username and password are not secret, in
fact they are included within environment variable table below.
The intention with the authentication challenge is to prevent people whom may
stumble across the site and not realise it is for testing, it also prevents
access by search engines and other bots.

## Environment variables

Environment variables are expected to be managed by the environment in which
the application is being run. This is best practice as described by
[twelve-factor](https://12factor.net/config).

| Variable                          | Description                                                                                   | Default                 |
| :-------------------------------- | :-------------------------------------------------------------------------------------------- | :---------------------- |
| `NODE_ENV`                        | node environment                                                                              | development             |
| `LOG_LEVEL`                       | numeric [log level](https://github.com/trentm/node-bunyan#levels)                             | Depends on `NODE_ENV`   |
| `PORT`                            | server port                                                                                   | 3000                    |
| `GOOGLE_ANALYTICS_TRACKING_ID`    | [Google Analytics](https://www.google.co.uk/analytics) property id                            |                         |
| `WEBTRENDS_ANALYTICS_TRACKING_ID` | [Webtrends](https://www.webtrends.com/) tracking id                                           |                         |
| `HOTJAR_ANALYTICS_TRACKING_ID`    | [Hotjar](https://www.hotjar.com/) tracking id                                                 |                         |
| `BASIC_AUTH`                      | An MD5 encrypted [htpasswd](https://httpd.apache.org/docs/2.4/misc/password_encryptions.html) | test:test               |

## Working on the application

Start by cloning the repo and all submodules i.e.
`git clone https://github.com/nhsuk/profiles.git && cd profiles/ && git submodule update --init --recursive`

Next, check out the set of scripts for getting the application running
[`scripts`](scripts/)

## Architecture Decision Records

This repo uses
[Architecture Decision Records](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)
to record architectural decisions for this project.
They are stored in [doc/adr](doc/adr).
