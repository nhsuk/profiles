# Profiles

[![Build Status](https://travis-ci.org/nhsuk/profiles.svg?branch=master)](https://travis-ci.org/nhsuk/profiles)
[![Coverage Status](https://coveralls.io/repos/github/nhsuk/profiles/badge.svg?branch=master)](https://coveralls.io/github/nhsuk/profiles?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/nhsuk/profiles/badge.svg)](https://snyk.io/test/github/nhsuk/profiles)

A collection of health service provider profiles. Initially containing GP practices and Pharmacies.

## Environment variables

Environment variables are expected to be managed by the environment in which
the application is being run. This is best practice as described by
[twelve-factor](https://12factor.net/config).

| Variable                         | Description                                                                            | Default                  | Required        |
|:---------------------------------|:---------------------------------------------------------------------------------------|:-------------------------|-----------------|
| `NODE_ENV`                       | node environment                                                                       | development              |                 |
| `LOG_LEVEL`                      | [bunyan log level](https://github.com/trentm/node-bunyan#levels)                       | Depends on `NODE_ENV`    |                 |
| `PORT`                           | server port                                                                            | 3000                     |                 |

## Application development

Start by cloning the repo and all submodules i.e. `git clone
https://github.com/nhsuk/profiles.git && cd profiles/ && git submodule update
--init --recursive`

It is good practice to run `docker-compose down -v` before starting the
application as this will clear up any resources from previous containers that
might otherwise affect the correct running of the application.  Run the
application with Docker via `docker-compose up --build --force-recreate
profiles-frontend`. This will build an image based on the code in the current
working directory and start it running. It will be available locally on
[http://localhost:3000](http://localhost:3000)

When finished with the application `docker-compose down -v` should be run to
shutdown all services, including volumes. This is the correct way to close down
resource used by the `up` command.

It is good practice to run the tests in a Docker container. To do this run
`docker-compose -f docker-compose-tests.yml up --build --force-recreate tests`.
A new container will be started where the tests will run and rerun when changes
are made to the source code.
