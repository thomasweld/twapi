var express          = require('express'),

CouponController = require('../controllers/CouponController'),
winston          = require('../../winston.config');

var router = express.Router();

router.use(function(req, res, next) {
    winston.log('info', '---A Coupon route is being called---');
    next();
});

/**
 * @swagger
 * definition:
 *   Coupon:
 *     properties:
 *       orderId:
 *         type: Schema.ObjectID
 *       eventId:
 *         type: Schema.ObjectID
 *       code:
 *         type: string
 *       amount:
 *         type: Number
 *       syncedAt: 
 *           type: Date
 *       redeemedAt: 
 *          type: Date
 *       createdAt: 
 *          type: Date
 *       updatedAt: 
 *          type: Date
 */


 router.route('/')
 /**
     * @swagger
     * /api/coupons:
     *   post:
     *     tags:
     *       - Coupons
     *     description: Create new Coupon
     *     produces:
     *       - application/json
     *     parameters: [
     *         {
     *           name: orderID,
     *           description: Order to map coupon to,
     *           in: body,
     *           required: false,
     *           schema: { $ref: '#/definitions/Coupon' }
     *         },
     *         {
     *           name: eventID,
     *           description: Event to map coupon to,
     *           in: body,
     *           required: false,
     *           schema: { $ref: '#/definitions/Coupon' }
     *         },
     *         {
     *           name: code,
     *           description: Coupon code,
     *           in: body,
     *           required: true,
     *           schema: { $ref: '#/definitions/Coupon' }
     *         },
     *         {
     *           name: amount,
     *           description: Amount of Coupon,
     *           in: body,
     *           required: true,
     *           schema: { $ref: '#/definitions/Coupon' }
     *         }
     *     ]
     *     responses:
     *       200:
     *         description: An array of Coupons
     *         schema:
     *           $ref: '#/definitions/Coupon'
     */
    .post(function(req, res) {
        return CouponController.createCoupon(req, res);
    })
    /**
    * @swagger
    * /api/coupons:
    *   get:
    *     tags:
    *       - Coupons
    *     description: Returns all Coupons
    *     produces:
    *       - application/json
    *     
    *     responses:
    *       200:
    *         description: An array of Coupons
    *         schema:
    *           $ref: '#/definitions/Coupon'
    */
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