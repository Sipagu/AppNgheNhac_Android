const mongoose = require('mongoose');
const CategorySchema = require('../models/schema/CategorySchema')

module.exports = mongoose.model('Category', CategorySchema);
