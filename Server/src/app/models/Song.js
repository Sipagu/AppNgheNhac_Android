const mongoose = require('mongoose');
const SongSchema = require('../models/schema/SongSchema')

module.exports = mongoose.model('Song', SongSchema);
