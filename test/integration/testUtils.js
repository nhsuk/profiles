const esClient = require('../../app/lib/esClient');

const maxWaitTimeMs = 3 * 60 * 1000;
const gracePeriodMs = 5000;
const pollingIntervalMs = 3000;

function removeWhitespace(text) {
  return text && text.trim().replace(/\s+/g, ' ');
}

function esServerReady() {
  // check if alive by requesting ID
  return esClient.getGp(43213).then(() => true).catch(() => false);
}

function waitForEsToStart(done, startTime) {
  esServerReady().then((res) => {
    if (res || (new Date() - startTime) > maxWaitTimeMs) {
      // errors may occur for calls immediately after return, wait a short time before continuing
      setTimeout(() => done(), gracePeriodMs);
    } else {
      setTimeout(() => waitForEsToStart(done, startTime), pollingIntervalMs);
    }
  });
}

function waitForSiteReady(done) {
  waitForEsToStart(done, new Date());
}

module.exports = {
  removeWhitespace,
  waitForSiteReady,
  maxWaitTimeMs
};
