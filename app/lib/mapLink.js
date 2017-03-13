function generateUrl(gp) {
  const name = gp.name;
  const address = gp.address.addressLines;
  const postcode = gp.address.postcode;
  const url = `https://maps.google.com/?q=${name},${address},${postcode}`.replace(/ /g, '+');
  return url;
}

module.exports = {
  generateUrl,
};
