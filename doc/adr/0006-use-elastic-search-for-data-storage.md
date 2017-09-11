# 6. Use Elastic Search for Data Storage

Date: 2017-08-24

## Status

Accepted

## Context

The same GP data is held in MongoDB and Elasticsearch. Elasticsearch is
configured as a cluster for reliability and failover, and provides a single
point for data updates. MongoDB runs as a single instance and is not
clustered.

## Decision

 Profiles will consume data from Elasticsearch rather than MongoDB.

## Consequences

The number of deployed components will be reduced.
GP-Finder and Profiles will use the same data source.
The profiles-db will no longer be required.
The `mongo-db-updater` will only need to update the pharmacy MongoDB instance.
