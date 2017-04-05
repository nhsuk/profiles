function removeWhitespace(text) {
  return text && text.trim().replace(/\s+/g, ' ');
}

module.exports = {
  removeWhitespace,
};
