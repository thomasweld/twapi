var express         = require('express'),

    EventController = require('../controllers/EventController'),
    winston         = require('../../winston.config'); 

var router = express.Router();

router.use(function(req, res, next) {
    winston.log('info', '---An Event route is being called---');
    next();
});
 
router.route('/')
    .post(function(req, res) {
         return EventController.createEvent(req, res);
    })
    .get(function(req, res) {
       return EventController.getAllEvents(req, res);
    });

router.route('/featured')
    .get(function(req, res) {
       return EventController.getAllFeaturedEvents(req, res);
    });
    
router.route('/:eventId')
    .get(function(req, res) {
        return EventController.getEventById(req, res);
    })
    .put(function(req, res) {
       return EventController.updateEvent(req, res); 
    })
    .delete(function(req, res) {
       return EventController.deleteEvent(req, res);
    });

module.exports = router;