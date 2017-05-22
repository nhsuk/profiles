function removeDuplicates(array) {
  return [...new Set(array)];
}

function compareLowerCase(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

function sortIgnoreCase(array) {
  return array && array.sort(compareLowerCase);
}

module.exports = {
  removeDuplicates,
  sortIgnoreCase,
};
