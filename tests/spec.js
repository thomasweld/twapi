//During the test the env variable is set to test
process.env.NODE_ENV='test';

let mongoose = require('mongoose'),
    Event = require('../app/models/event');

//Require the dev-dependencies
let chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    assert = chai.assert,
    should = chai.should();

chai.use(chaiHttp);

  /*
  * Test the /GET route
  */
  describe('/GET events', () => {
      it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/api/events')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.forEach(function(event) {
                  assert.isNotFalse(event.title, 'Events should always have a title');
                  assert.isNotFalse(event.created_at, 'Events should always have a create date');
                  assert.include(['pending', 'confirmed', 'in progress', 'over'], event.status, 
                    'There are only 4 possible statuses for an event');
                  assert.include(['jpg', 'gif', 'bmp', 'png'], event.image_content_type, 
                    'There are only 4 supported image types');
                });
              done();
            });
      });
  });