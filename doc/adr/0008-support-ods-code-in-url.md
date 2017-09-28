# 8. Use ODS Code as Canonical URL

Date: 2017-09-28

## Status

Accepted

## Context

Profile records are currently identified only by the Choices (PIMS) ID.
They also contain an Organisation Data Service (ODS) code which is used throughout the NHS to identify organisations and individuals across health and social care.
More information can be found [here](https://digital.nhs.uk/organisation-data-service)
ODS codes always contain a letter, Choices IDs are numerical.

## Decision

The ID in the URL `/gp-surgeries/<id>` will support both the Choices ID and the ODS code, using the presence of a letter to distinguish between them. If the URL is visited with a Choices ID, it will be re-directed to the ODS code.

## Consequences

The profiles application will make two Elasticsearch queries when displaying a profile from a Choices ID, one to look up the ODS code and another to retrieve the profile from the ODS code.
