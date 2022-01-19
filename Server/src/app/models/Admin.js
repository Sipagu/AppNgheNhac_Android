const mongoose = require('mongoose');
const AdminSchema = require('./schema/AdminSchema')

module.exports = mongoose.model('Admin', AdminSchema);
