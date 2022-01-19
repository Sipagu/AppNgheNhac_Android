const mongoose = require('mongoose');
const PlaylistSchema = require('./schema/PlaylistSchema')

module.exports = mongoose.model('Playlist', PlaylistSchema);
