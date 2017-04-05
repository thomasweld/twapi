var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    // MUST BE UNIQUE INDEX
    userId: { 
        type: Schema.ObjectId, 
        index: { unique: true } 
    }, 
    createdAt: {
        type:     Date,
        required: [true, 'Create date cannot be null']
    },
    updatedAt:         Date,
    eventId: Schema.ObjectId,
    // MUST BE INDEX
    redemptionCode: {
        type: String, 
        index: true 
    }, 
    deliveryEmail: String, 
    last4: String,
    chargeBrand: String
});

module.exports = mongoose.model('Order', OrderSchema);