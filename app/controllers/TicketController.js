// NODE MODULES
var express       = require('express'),

// OUR MODULES
    dateFunctions = require('../utils/date_functions.js'),
    idObj         = require('../utils/idGen'),
    Ticket        = require('../../app/models/ticket'),
    winston       = require('../../winston.config');

// PATH /
// CREATE TICKET
exports.createTicket = function(req, res) {
    var ticket = new Ticket();
    ticket.sku = req.body.sku;
    ticket.status = req.body.status;
    ticket.userId = idObj.userId;
    ticket.tierId = idObj.tierId;
    ticket.orderId = idObj.orderId;
    ticket.createdAt = dateFunctions.getDate();

    ticket.save(function(err) {
        if (err) {
            winston.log('error', '---POST TICKET ERROR---', { error: err });
            res.send(err);
        }
        res.json(ticket);
    });
};
// GET ALL TICKETS
exports.getAllTickets = function(req, res) {
    winston.log('info', '--GET All Tickets--');
    Ticket.find(function(err, tickets) {
        if (err) {
            winston.log('error', '---GET ALL TICKETS ERROR---', { error: err });
            res.send(err);
        }
        res.json(tickets);
    });
};

// PATH /:ticketId
// GET TICKET BY ID
exports.getTicketById = function(req, res) {
    winston.log('info', '---GET Ticket by ID---');
    Ticket.findById(req.params.ticketId, function(err, ticket) {
        if (err) {
            winston.log('error', '---GET TICKET ERROR---', { error: err });
            res.send(err);
        }
        res.json(ticket);
    });
};
// UPDATE TICKET
exports.updateTicket = function(req, res) {
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
};
// DELETE TICKET
exports.deleteTicket = function(req, res) {
    winston.log('info', '---DELETE Ticket by ID---');
    Ticket.remove({ _id: req.params.ticketId }, function(err, ticket) {
        if (err) {
            winston.log('error', '---DELETE TICKET ERROR---', { error: err });
            res.send(err);
        }
        res.json(ticket);
    });
};