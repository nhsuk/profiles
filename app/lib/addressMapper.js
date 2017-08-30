function map(address) {
  if (address.addressLines) {
    // eslint-disable-next-line no-param-reassign
    address.streetAddress = address.addressLines.reduce((a, b) => `${a}, ${b}`);
  }
  return address;
}

module.exports = map;
