function addUrl(gpName) {
    const name = gpName.name;
    const address = gpName.address.addressLines;
    const postcode = gpName.address.postcode;
    const url = `http://maps.google.com/?q=${name},${address},${postcode}`.replace(/ /g, '+');
    return url;
}

module.exports = {
  addUrl,
};
