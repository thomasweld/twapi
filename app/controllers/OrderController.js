// NODE MODULES
var express       = require('express'),

// OUR MODULES
    dateFunctions = require('../utils/date_functions.js'),
    idObj         = require('../utils/idGen'),
    Order         = require('../../app/models/order'),
    Gen           = require('../utils/gen_functions.js'),
    winston       = require('../../winston.config');

// PATH /
// CREATE ORDER
exports.createOrder = function(req, res) {
    var order = new Order();
    order.userId = idObj.userId;
    order.createdAt = dateFunctions.getDate();
    order.eventId = idObj.eventId;
    order.redemptionCode = Gen.generateRedemptionCode();
    order.deliveryEmail = req.body.deliveryEmail;
    order.last4 = req.body.last4;
    order.chargeBrand = req.body.chargeBrand;

    order.save(function(err) {
        if (err) {
            winston.log('error', '---POST ORDER ERROR---', { error: err });
            res.send(err);
        }
        res.json(order);
    });
};
// GET ALL ORDERS
exports.getAllOrders = function(req, res) {
    winston.log('info', '--GET All ORDERS --');
    Order.find(function(err, orders) {
        if (err) {
            winston.log('error', '---GET ALL ORDERS ERROR---', { error: err });
            res.send(err);
        }
        res.json(orders);
    });
};

// PATH /:ticketId
// GET TICKET BY ID
/*exports.getTicketById = function(req, res) {
    winston.log('info', '---GET Ticket by ID---');
    Ticket.findById(req.params.ticketId, function(err, ticket) {
        if (err) {
            winston.log('error', '---GET TICKET ERROR---', { error: err });
            res.send(err);
        }
        res.json(ticket);
    });
};*/
// UPDATE TICKET
/*exports.updateTicket = function(req, res) {
    winston.log('info', '---PUT Ticket by ID---');
    Ticket.findById(req.params.ticketId, function(err, updatedTicket) {
        if (err) {
            res.send(err);
        }

        updatedTicket.status     = req.body.status;
        updatedTicket.sku = req.body.sku;
        updatedTicket.updatedAt   = dateFunctions.getDate();

        updatedTicket.save(function(err, updatedTicket) {
            if (err) { 
                winston.log('error', '---UPDATE TICKET ERROR---', { error: err });
                res.send(err);
            }
            res.json(updatedTicket);
        });
    });
};*/
// DELETE TICKET
/*exports.deleteTicket = function(req, res) {
    winston.log('info', '---DELETE Ticket by ID---');
    Ticket.remove({ _id: req.params.ticketId }, function(err, ticket) {
        if (err) {
            winston.log('error', '---DELETE TICKET ERROR---', { error: err });
            res.send(err);
        }
        res.json(ticket);
    });
};*/