# 8. Use ODS Code as Canonical URL

Date: 2017-09-25

## Status

Accepted

## Context

Profile records are currently identified only by the Choices (PIMS) ID.
A better option is the ODS Code which is a system wide identifier.

## Decision

The existing canonical URL `/gp-surgeries/<odsCode>` will be indexed on the ODS Code.
Lookup by Choices ID will be available at `/gp-surgeries/choices-id/<choicesId>`.

## Consequences

[gp-redirect](https://github.com/nhsuk/gp-redirect) will be updated to use the new `/gp-surgeries/choices-id/<choicesId>` URL rather than the previous `/gp-surgeries/<choicesId>` format.
