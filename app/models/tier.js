var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var TierSchema   = new Schema({
    name: {
        type: String,
        required: [true, 'A tier name is required']
    },
    description: String,
    level: Number,
    startDate: Date,
    price: Number,
    provisionedTickets: {
      type: Number,
      default: 0
    },
    unprovisionedTickets: {
      type: Number,
      default: 0
    },
    display: {
      type: Boolean,
      default: true
    },
    eventId: Number,
    createdAt: {
        type: Date,
        required: [true, 'A create date is required']
    },
    updatedAt: Date
}, { collection: 'Tiers' });

module.exports = mongoose.model('Tier', TierSchema);
