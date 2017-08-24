const esClient = require('../../app/lib/esClient');

function removeWhitespace(text) {
  return text && text.trim().replace(/\s+/g, ' ');
}

function esServerReady() {
  // check if alive by requesting ID non existent index
  return esClient.getGp(43213).then(() => true).catch(() => false);
}

function waitForEsToStart(done, startTime, maxWaitTime) {
  esServerReady().then((res) => {
    if (res || (new Date() - startTime) > maxWaitTime) {
      done();
    } else {
      setTimeout(() => waitForEsToStart(done, startTime, maxWaitTime), 3000);
    }
  });
}

module.exports = {
  removeWhitespace,
  waitForEsToStart,
};
