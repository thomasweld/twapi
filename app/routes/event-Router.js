var express       = require('express'),
    dateFunctions = require('../utils/date_functions.js'),
    mongoose      = require('mongoose'),
    Event         = require('../../app/models/event'); 

var router = express.Router();

router.use(function(req, res, next) {
    console.log('---An Event route is being called---');
    next();
});
 
router.route('/')
    .post(function(req, res) {
         console.log('POST Event');
        var event = new Event();
        event.title            = req.body.title;
        event.description      = req.body.description;
        event.startDate        = req.body.startDate;
        event.endDate          = req.body.endDate;
        event.userId           = mongoose.Types.ObjectId();
        event.createdAt        = dateFunctions.getDate();
        event.updatedAt        = null;
        event.status           = req.body.status;
        event.imageFileName    = req.body.imageFileName;
        event.imageContentType = req.body.imageContentType;
        event.imageFileSize    = req.body.imageFileSize;
        event.imageUpdatedAt   = dateFunctions.getDate();
        event.location         = req.body.location;
        event.organizationId   = req.body.organizationId;
        event.isFeatured       = req.body.isFeatured;

        event.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json(event);
        });
    })
    .get(function(req, res) {
         console.log('GET Events');
        Event.find(function(err, events) {
            if (err) {
                res.send(err);
            }
            res.json(events);
        });
    });

router.route('/featured')
    .get(function(req, res) {
        console.log('GET Featured Events');
        Event.find({ 'isFeatured': 'true'}, function(err, events) {
            if (err) {
                res.send(err);
            }
            res.json(events);
        });
    });
    
router.route('/:eventId')
    .get(function(req, res) {
        console.log('GET Event by ID');
        Event.findById(req.params.eventId, function(err, event) {
            if (err) {
                res.send(err);
            }
            res.json(event);
        });
    })
    .put(function(req, res) {
         console.log('PUT Event by ID');
        Event.findById(req.params.eventId, function(err, updatedEvent) {
            if (err) {
                res.send(err);
            }

            updatedEvent.title = req.body.title;
            updatedEvent.description = req.body.description;
            updatedEvent.startDate = req.body.startDate;
            updatedEvent.endDate = req.body.endDate;
            updatedEvent.createdAt = dateFunctions.getDate();
            updatedEvent.status = req.body.status;
            updatedEvent.imageFileName = req.body.imageFileName;
            updatedEvent.location = req.body.location;

            updatedEvent.save(function(err, updatedEvent) {
                if (err) { 
                    res.send(err);
                }
                res.json(updatedEvent);
            });
        });
    })
    .delete(function(req, res) {
         console.log('DELETE Event by ID');
        Event.remove({ _id: req.params.eventId }, function(err, event) {
            if (err) {
                res.send(err);
            }
            res.json(event);
        });
    });

module.exports = router;