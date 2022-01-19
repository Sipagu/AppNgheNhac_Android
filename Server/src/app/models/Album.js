const mongoose = require('mongoose');
const AlbumSchema = require('../models/schema/AlbumSchema')

module.exports = mongoose.model('Album', AlbumSchema);
