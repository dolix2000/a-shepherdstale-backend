/**
 * Testing Basic Authentication
 */

const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
const app = require("../src/app");

chai.use(chaiHttp);

describe('Basic Auth Tests', () => {

  // testing if headers are not set, that it returns error
  describe('No Headers set', () => {
    it('should return error', async () => {
      chai
      .request(app)
      .get('/players')
      .then((err, res) => {
          expect(res.body).to.have.property(err);
          expect(res).to.have.status(401);
        })
        .catch((err) => {
          // ensure it resolves promise
          console.log(err);
        });
    });
  })

  // testing if headers are set, doesn't return error
  describe('Headers set', () => {
    it("should not return an error", (done) => {
      chai
        .request(app)
        .get("/players")
        .auth(process.env.HER_USERNAME, process.env.HER_PASSWORD)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  })
});