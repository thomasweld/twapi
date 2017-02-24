// NODE MODULES
var express    = require('express'),   
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
// OUR MODULES
    eventRouter  = require('./app/routes/event-Router'),  
    couponRouter = require('./app/routes/coupon-Router'),
    ticketRouter = require('./app/routes/ticket-router'),
    dbUtil       = require('./app/data/db.js'),
    winston      = require('./winston.config');

var app = express();  

// CONNECT TO DB AND REGISTER DATA EVENT -------------
// ===================================================
dbUtil.dbConnect();             

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 80;//process.env.PORT;
var env  = process.env.NODE_ENV;
// REGISTER OUR ROUTES -------------------------------
// ===================================================
app.use('/api/events', eventRouter);
app.use('/api/coupons', couponRouter);
//app.use('/api/tiers', tierRouter);
app.use('/api/tickets', ticketRouter);

// START THE SERVER
// ===================================================
app.listen(port);
winston.log('info', 'About to crank up Node Server on port: ' + port + ' in environment: ' + env);

module.exports = app;