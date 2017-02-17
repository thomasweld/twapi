var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CouponSchema   = new Schema({
    orderId: Schema.ObjectId,
    eventId: Schema.ObjectId,
    code: {
        type: String,
        required: [true, 'A coupon code is required']
    },
    amount: {
        type: Number,
        required: [true, 'A coupon amount is required']
    },
    syncedAt: Date,
    redeemedAt: Date,
    createdAt: {
        type: Date,
        required: [true, 'A create date is required']
    },
    updatedAt: Date
}, { collection: 'Coupons' });

module.exports = mongoose.model('Coupon', CouponSchema);
