# 8. Use ODS Code as Canonical URL

Date: 2017-09-25

## Status

Accepted

## Context

Profile records are currently identified only by the Choices (PIMS) ID.
A better option is the Organisation Data Service (ODS) Code which is used throughout the NHS to identify organisations and individuals across health and social care.
More information can be found [here](https://digital.nhs.uk/organisation-data-service)

## Decision

The ID in the URL `/gp-surgeries/<id>` will change from the Choices ID to the ODS Code.
Access to a GP profile by Choices ID will be available at the URL `/gp-surgeries/choices-id/<choicesId>`.

## Consequences

[gp-redirect](https://github.com/nhsuk/gp-redirect) will be updated to use the new `/gp-surgeries/choices-id/<choicesId>` URL rather than the previous `/gp-surgeries/<choicesId>` format.
