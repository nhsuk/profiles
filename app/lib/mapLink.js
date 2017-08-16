const qs = require('querystring');

function generateUrl(gp) {
  const query = `${gp.name},${gp.address.addressLines},${gp.address.postcode}`;
  const encodedQuery = qs.escape(query);
  const url = `https://maps.google.com/?q=${encodedQuery}`;

  return url;
}

module.exports = {
  generateUrl,
};
