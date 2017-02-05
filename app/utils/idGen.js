var mongoose = require('mongoose');

var exports = module.exports = {};

var idTestObj = {};

idTestObj.orderId = mongoose.Types.ObjectId();
idTestObj.eventId = mongoose.Types.ObjectId();
idTestObj.code = mongoose.Types.ObjectId();

module.exports = idTestObj;