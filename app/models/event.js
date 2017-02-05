var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var EventSchema   = new Schema({
    title: {
        type:     String,
        required: [true, 'A title is required'] 
    },
    description:        String,
    startDate:         Date,
    endDate:           Date,
    userId:            Schema.ObjectId,
    createdAt: {        
        type:     Date,
        required: [true, 'Create Date cannot be Null']
    },
    updatedAt:         Date,
    status: {            
        type: String,
        enum: ['pending', 'confirmed', 'in progress', 'over']
    },
    imgaeFileName:    String,
    imageContentType: {
        type: String,
        enum: ['jpg', 'gif', 'bmp', 'png']
    },
    imageFileSize:    Number,
    imageUpdatedAt:   Date,
    location:           String,
    organizationId:    Number,
    isFeatured:        Boolean
}, { collection: 'Events' });

module.exports = mongoose.model('Event', EventSchema);