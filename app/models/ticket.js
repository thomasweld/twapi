var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var TicketSchema   = new Schema({
    sku: {
        type:     String,
        required: [true, 'A sku is required']
    },
    status: {
        type:     String,
        required: [true, 'A status is required']
    },
    userId: Schema.ObjectId,
    tierId: Schema.ObjectId,
    orderId: Schema.ObjectId,
    // eventId: Number, // >> DO WE NEED THIS ?
    createdAt: {
        type: Date,
        required: [true, 'A create date is required']
    },
    updatedAt: Date

}, { collection: 'Tickets' });

module.exports = mongoose.model('Ticket', TicketSchema);
