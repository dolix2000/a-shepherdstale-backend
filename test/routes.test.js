/**
 * Testing Request Routes
 * POST and PUT test point to different endpoint (since we are inserting/updating testplayers)
 */

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../src/app');

const testURL ='https://ashepherdstale.herokuapp.com'

chai.use(chaiHttp);

describe("Request Tests", function () {
  // 10 second timeout for setup
  this.timeout(5000);

  // GET test method
  describe('Test GET route /players', () => {
    it('should return all players', (done) => {
      chai
        .request(app)
        .get('/players')
        .auth(process.env.HER_USERNAME, process.env.HER_PASSWORD)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // POST test method
  describe('Test POST route /testplayers/create', () => {
    // test data
    const playerBody = {
      player_name: 'Herbert',
      score: 50000,
      play_time: '4:12',
    };

    it('should post a player', async () => {
      chai
        .request(testURL)
        .post('/testplayers/create')
        .set('content-type', 'application/x-www-form-urlencoded')
        .auth(process.env.HER_USERNAME, process.env.HER_PASSWORD)
        .send(playerBody)
        .then((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
        })
        .catch((err) => {
          // ensure it resolves promise
          done(err);
        });
    });
  });

  // PUT test method
  describe('Test PUT route /testplayers/:id', () => {
    // test data
    const playerBody = {
      score: 2000,
      play_time: '1:34',
    };
    it('should update a player', async () => {
      chai
        .request(testURL)
        .put('/testplayers/8')
        .set('content-type', 'application/x-www-form-urlencoded')
        .auth(process.env.HER_USERNAME, process.env.HER_PASSWORD)
        .send(playerBody)
        .then((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.have.property('score').eql(2000);
        })
        .catch((err) => {
          // ensure it resolves promise
          done(err);
        });
    });
  });

  /*
  * test works locally
  * but not with github actions
  */

  // // GET test method one player
  // describe('Test GET route /players/:id', () => {
  //   it('should return a player', (done) => {
  //     chai
  //       .request(app)
  //       .get('/players/9')
  //       .auth(process.env.HER_USERNAME, process.env.HER_PASSWORD)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         done();
  //       });
  //   });
  // });
});
