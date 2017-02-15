var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CouponSchema   = new Schema({
    orderId: Schema.ObjectId,
    eventId: Schema.ObjectId,
    amount: {
        type: Number,
        required: [true, 'A Coupon Amount is Required']
    },
    syncedAt: Date,
    redeemedAt: Date,
    createdAt: {
        type: Date,
        required: [true, 'a create date is required']
    },
    // don't understand why update date would be required
    updatedAt: {
        type: Date,
        //required: [true, 'an updated date is rquired']
    }
}, { collection: 'Coupons' });

module.exports = mongoose.model('Coupon', CouponSchema);