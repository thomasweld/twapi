var Coupon        = require('../../app/models/coupon'),
    winston       = require('../../winston.config'),
    idObj         = require('../utils/idGen'),
    dateFunctions = require('../utils/date_functions.js');

// PATH /
// CREATE COUPON
exports.createCoupon = function(req, res) {
    var coupon = new Coupon();
    coupon.orderId    = idObj.orderId;
    coupon.eventId    = idObj.eventId;
    coupon.amount     = req.body.amount;
    coupon.syncedAt   = req.body.syncedAt;
    coupon.redeemedAt = req.body.redeemedAt;
    coupon.createdAt  = dateFunctions.getDate();
    coupon.updatedAt  = req.body.updatedAt;
    coupon.code = req.body.code;

    coupon.save(function(err) {
        if (err) {
            winston.log('error', '---POST COUPON ERROR---', { error: err });
            res.send(err);
        }
        res.json(coupon);
    });
};
// GET ALL COUPONS
exports.getAllCoupons = function(req, res) {
    winston.log('info', '---GET All Coupons---');
    Coupon.find(function(err, coupons) {
        if (err) {
            winston.log('error', '---GET ALL COUPONS ERROR', { error: err });
            res.send(err);
        }
        res.json(coupons);
    });
};

// PATH /:couponId
exports.getCouponById = function(req, res) {
    winston.log('info', '---GET Coupon by ID---');
    Coupon.findById(req.params.couponId, function(err, coupon) {
        if (err) {
            winston.log('error', '---GET COUPON ERROR', { error: err });
            res.send(err);
        }
        res.json(coupon);
    });
};

exports.updateCoupon = function(req, res) {
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
                winston.log('error', '---UPDATE COUPON ERROR---', { error: err });
                res.send(err);
            }
            res.json(updatedCoupon);
        });
    });
};

exports.deleteCoupon = function(req, res) {
    winston.log('info', '---DELETE Coupon by ID---');
    Coupon.remove({ _id: req.params.couponId }, function(err, coupon) {
        if (err) {
            winston.log('error', '---DELETE COUPON ERROR---', { error: err });
            res.send(err);
        }
        res.json(coupon);
    });
};