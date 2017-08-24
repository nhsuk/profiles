# 5. Use Elastic Search for Data Storage

Date: 2017-08-24

## Status

Accepted

## Context

The same GP data is held in MongoDB and Elasticsearch.
Elasticsearch is configured as a cluster for reliability and failover, and provides a single point for data updates.
MongoDB runs as a single instance and is not clustered.

## Decision

To reduce the deployed components Profiles will consume data from Elasticsearch rather than MongoDB, ensuring that the GP-Finder and Profiles use the same data source.

## Consequences

The profiles-db will no longer be required.
The mongo-db-updater will only need to update the pharmacy MongoDB instance.
