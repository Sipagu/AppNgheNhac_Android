const mongoose = require('mongoose');
const PlaylistUserSchema = require('./schema/PlaylistUserSchema')

module.exports = mongoose.model('PlaylistUser', PlaylistUserSchema);
