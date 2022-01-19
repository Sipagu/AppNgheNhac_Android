const mongoose = require('mongoose');
const UserSchema = require('../models/schema/UserSchema')

module.exports = mongoose.model('User', UserSchema);