var express    = require('express'),   
    mongoose   = require('mongoose'),
    eventRouter = require('./app/routes/event-Router'),  
    couponRouter = require('./app/routes/coupon-Router'),
    dbUtil      = require('./app/data/db.js'),
    bodyParser = require('body-parser');

var app = express();  

// CONNECT TO DB AND REGISTER DATA EVENT -------------
// ===================================================
dbUtil.dbConnect();             

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT;
var env  = process.env.NODE_ENV;
// REGISTER OUR ROUTES -------------------------------
// ===================================================
app.use('/api/events', eventRouter);
app.use('/api/coupons', couponRouter);

// START THE SERVER
// ===================================================
app.listen(port);
console.log('About to crank up Node Server on port: ' + port + ' in environment: ' + env);

module.exports = app;