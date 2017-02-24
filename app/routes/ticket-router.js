// NODE MODULES
var express       = require('express'),
    mongoose      = require('mongoose'),

// OUR MODULES
    dateFunctions = require('../utils/date_functions.js'),
    idObj         = require('../utils/idGen'),
    Ticket        = require('../../app/models/ticket'),
    winston       = require('../../winston.config');

var router = express.Router();

// TODO - this is just for testing, remove later
var ids = idObj;

router.use(function(req, res, next) {
    winston.log('info', '---A Ticket route is being called---');
    next();
});

router.route('/')
    .post(function(req, res) {
        var ticket = new Ticket();
        ticket.sku = req.body.sku;
        ticket.status = req.body.status;
        ticket.userId = idObj.userId;
        ticket.tierId = idObj.tierId;
        ticket.orderId = idObj.orderId;
        ticket.createdAt = dateFunctions.getDate();

        ticket.save(function(err) {
            if (err) {
                winston.log('error', '---POST TICKET ERROR', { error: err });
                res.send(err);
            }
            res.json(ticket);
        });
    })
    .get(function(req, res) {
        winston.log('info', '--GET All Tickets--');
        Ticket.find(function(err, tickets) {
            if (err) {
                winston.log('error', '---GET ALL TICKETS ERROR', { error: err });
                res.send(err);
            }
            res.json(tickets);
        });
    });
    
router.route('/:ticketId')
    .get(function(req, res) {
        winston.log('info', '---GET Ticket by ID---');
        Ticket.findById(req.params.ticketId, function(err, ticket) {
            if (err) {
                winston.log('error', '---GET TICKET ERROR', { error: err });
                res.send(err);
            }
            res.json(ticket);
        });
    })
    .put(function(req, res) {
        winston.log('info', '---PUT Ticket by ID---');
        Ticket.findById(req.params.ticketId, function(err, updatedTicket) {
            if (err) {
                res.send(err);
            }

            updatedTicket.status     = req.body.status;
            updatedTicket.updatedAt   = dateFunctions.getDate();

            updatedTicket.save(function(err, updatedTicket) {
                if (err) { 
                    winston.log('error', '---UPDATE TICKET ERROR', { error: err });
                    res.send(err);
                }
                res.json(updatedTicket);
            });
        });
    })
    .delete(function(req, res) {
        winston.log('info', '---DELETE Ticket by ID---');
        Ticket.remove({ _id: req.params.ticketId }, function(err, ticket) {
            if (err) {
                winston.log('error', '---DELETE TICKET ERROR', { error: err });
                res.send(err);
            }
            res.json(ticket);
        });
    });

module.exports = router;