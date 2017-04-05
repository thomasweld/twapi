// NODE MODULES
var express         = require('express'),

    OrderController = require('../controllers/OrderController'),
    winston         = require('../../winston.config');

var router = express.Router();

router.use(function(req, res, next) {
    winston.log('info', '---An Order route is being called---');
    next();
});

router.route('/')
    .post(function(req, res) {
        return OrderController.createOrder(req, res);
    })
    .get(function(req, res) {
       return OrderController.getAllOrders(req, res);
    });
    
/*router.route('/:ticketId')
    .get(function(req, res) {
        return TicketController.getTicketById(req, res);
    })
    .put(function(req, res) {
        return TicketController.updateTicket(req, res);
    })
    .delete(function(req, res) {
        return TicketController.deleteTicket(req, res);
    });*/

module.exports = router;