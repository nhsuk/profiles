const tenon = require('tenon-api-client');
const chai = require('chai');
const expect = chai.expect;

function tennonFunc(err, response) {
  if (err) {
    console.log('Ooops: ' + err);
  } else {
    console.log(response);
    /*for (let i = 0; i < response.resultSet.length; i++) {
      describe('Error:', () => {
        barry = JSON.stringify(response.resultSet[i].errorTitle, null, ' ');
        it(barry, (done) => {
          expect(response).to.not().equal(null);
          done();
        });
      });
    }*/
  }
};

tenon({
  url: 'http://localhost:3000/gp-surgeries/43121',
  key: '176803475089b3b47b0fb4cf709d9055',
  inline: false,
  config: 'config/tenon.js'
}, tennonFunc);
