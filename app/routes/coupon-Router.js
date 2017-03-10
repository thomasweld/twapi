var express          = require('express'),

    CouponController = require('../controllers/CouponController'),
    winston          = require('../../winston.config');

var router = express.Router();

router.use(function(req, res, next) {
    winston.log('info', '---A Coupon route is being called---');
    next();
});

router.route('/')
    .post(function(req, res) {
        return CouponController.createCoupon(req, res);
    })
    .get(function(req, res) {
       return CouponController.getAllCoupons(req, res);
    });
    
router.route('/:couponId')
    .get(function(req, res) {
        return CouponController.getCouponById(req, res);
    })
    .put(function(req, res) {
        return CouponController.updateCoupon(req, res);
    })
    .delete(function(req, res) {
         return CouponController.deleteCoupon(req, res);
    });

module.exports = router;