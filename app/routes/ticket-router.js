// NODE MODULES
var express       = require('express'),

    TicketController = require('../controllers/TicketController'),
    winston       = require('../../winston.config');

var router = express.Router();

router.use(function(req, res, next) {
    winston.log('info', '---A Ticket route is being called---');
    next();
});

router.route('/')
    .post(function(req, res) {
        return TicketController.createTicket(req, res);
    })
    .get(function(req, res) {
       return TicketController.getAllTickets(req, res);
    });
    
router.route('/:ticketId')
    .get(function(req, res) {
        return TicketController.getTicketById(req, res);
    })
    .put(function(req, res) {
        return TicketController.updateTicket(req, res);
    })
    .delete(function(req, res) {
        return TicketController.deleteTicket(req, res);
    });

module.exports = router;