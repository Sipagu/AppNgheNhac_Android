const mongoose = require('mongoose');
const SingerSchema = require('../models/schema/SingerSchema')

module.exports = mongoose.model('Singer', SingerSchema);
