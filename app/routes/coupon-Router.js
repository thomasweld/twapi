var express       = require('express'),
    dateFunctions = require('../utils/date_functions.js'),
    mongoose      = require('mongoose'),
    idObj         = require('../utils/idGen'),
    Coupon        = require('../../app/models/coupon'),
    winston       = require('../../winston.config');

var router = express.Router();

// TODO - this is just for testing, remove later
var ids = idObj;

router.use(function(req, res, next) {
    winston.log('info', '---A Coupon route is being called---');
    next();
});

router.route('/')
    .post(function(req, res) {
        winston.log('info', '---POST Coupon---');
        var coupon = new Coupon();
        coupon.orderId    = idObj.orderId;
        coupon.eventId    = idObj.eventId;
        coupon.amount     = req.body.amount;
        coupon.syncedAt   = req.body.syncedAt;
        coupon.redeemedAt = req.body.redeemedAt;
        coupon.createdAt  = dateFunctions.getDate();
        coupon.updatedAt  = req.body.updatedAt;

        coupon.save(function(err) {
            if (err) {
                winston.log('error', '---POST COUPON ERROR', { error: err });
                res.send(err);
            }
            res.json(Coupon);
        });
    })
    .get(function(req, res) {
        winston.log('info', '--GET All Coupons--');
        Coupon.find(function(err, coupons) {
            if (err) {
                winston.log('error', '---GET ALL COUPONS ERROR', { error: err });
                res.send(err);
            }
            res.json(coupons);
        });
    });
    
router.route('/:couponId')
    .get(function(req, res) {
        winston.log('info', '---GET Coupon by ID---');
        Coupon.findById(req.params.couponId, function(err, coupon) {
            if (err) {
                winston.log('error', '---GET COUPON ERROR', { error: err });
                res.send(err);
            }
            res.json(coupon);
        });
    })
    .put(function(req, res) {
        winston.log('info', '---PUT Coupon by ID---');
        Coupon.findById(req.params.couponId, function(err, updatedCoupon) {
            if (err) {
                res.send(err);
            }

            updatedCoupon.amount     = req.body.amount;
            updatedCoupon.syncedAt   = req.body.syncedAt;
            updatedCoupon.redeemedAt = req.body.redeemedAt;
            updatedCoupon.updatedAt  = dateFunctions.getDate();

            updatedCoupon.save(function(err, updateCoupon) {
                if (err) { 
                    winston.log('error', '---UPDATE COUPON ERROR', { error: err });
                    res.send(err);
                }
                res.json(updatedCoupon);
            });
        });
    })
    .delete(function(req, res) {
        winston.log('info', '---DELETE Coupon by ID---');
        Coupon.remove({ _id: req.params.couponId }, function(err, coupon) {
            if (err) {
                winston.log('error', '---DELETE COUPON ERROR', { error: err });
                res.send(err);
            }
            res.json(coupon);
        });
    });

module.exports = router;