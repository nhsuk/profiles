# 5. Add meta data

Date: 2017-08-29

## Status

Accepted

## Context

Meta data needs adding to each profile page in order that other services such
as Facebook, Twitter (social media) and Funnelback (search) can accurately
interpret the data on the page.

## Decision

The decision is to add Open Graph (http://ogp.me/) data for better integration
with Facebook. The Open Graph protocol is also widely used by a host of other
sites including Twitter. For full integration with the Twitter card system
(https://dev.twitter.com/cards/overview) some additional data needs to be
added, which it has been. Another standard for metadata is http://schema.org/.
The JSON-LD format has been chosen to represent schema.org information to gain
the best integration with Google Search
(https://developers.google.com/search/docs/guides/intro-structured-data).

## Consequences

A consequence of adding the metadata to the page is that the size of the page
has increased. This has been considered and the advantages are deemed to
outweigh that cost.
