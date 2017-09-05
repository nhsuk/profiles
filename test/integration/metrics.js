const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../server');
const promClient = require('../../app/lib/promBundle').promClient;

const expect = chai.expect;
chai.use(chaiHttp);

describe('metrics end point', () => {
  let responseText;

  before('make request to /metrics endpoint', (done) => {
    chai.request(app)
      .get('/metrics')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        responseText = res.text;
        done();
      });
  });

  it('should return an up gauge', () => {
    expect(responseText).to.have.string('# HELP up 1 = up, 0 = not up\n# TYPE up gauge\nup 1');
  });

  it('should return an http_request_duration_seconds histogram', () => {
    expect(responseText).to.have.string('# HELP http_request_duration_seconds duration histogram of http responses labeled with: status_code, method\n# TYPE http_request_duration_seconds histogram');
  });

  it('should return an app_start counter', () => {
    expect(responseText).to.have.string('# HELP app_start times the application has been started\n# TYPE app_start counter\napp_start 0');
  });

  it('should return a not_found counter', () => {
    expect(responseText).to.have.string('# HELP not_found not found page has been returned\n# TYPE not_found counter\nnot_found');
  });

  it('should return a gp_profile counter', () => {
    expect(responseText).to.have.string('# HELP gp_profile GP profile has been returned\n# TYPE gp_profile counter\ngp_profile');
  });

  it('should return an error counter', () => {
    expect(responseText).to.have.string('# HELP error error page has been returned\n# TYPE error counter\nerror');
  });

  it('should return a cache control header counter', () => {
    expect(responseText).to.have.string('# HELP cache_header Cache-Control header set\n# TYPE cache_header counter\ncache_header');
  });

  afterEach('clear metrics', () => {
    // Clear the metrics created when the app starts to avoid reports of:
    // Error: A metric with the name up has already been registered.
    promClient.register.clear();
  });
});
