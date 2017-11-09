# 10. Use Brunch for static asset processing

Date: 2017-11-08

## Status

Accepted

## Context

Front-end assets need to be minified, compressed and not cached when they
change. Currently the cache busting process is manual and there is no
additional processing done on.

## Decision

It has been decided to use [Brunch](http://brunch.io/) as the framework to
process front-end assets. Brunch provides the framework to process the assets.
The specialist processing required by the different types of assets is done by
plugins.

## Consequences

Brunch is a more complicated tool than the manual cache busting process that
has been utilised thus far. However, the ability to use additional plugins for
more complex tasks such as the compression and minification of the assets is
easily achieved.
