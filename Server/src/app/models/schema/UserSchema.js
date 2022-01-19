const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Album = require('./AlbumSchema')
const Playlist = require('./PlaylistSchema');

const User = new Schema({
    username: String,
    password: String,
    name: String,
    sex: Boolean,
    email: String,
    avatar: String,
    resetCode: String,
    favoriteSinger: [String],
    followPlaylist: [Playlist],
    followAlbum: [Album]
 }, 
    {
        versionKey: false
    }
);

module.exports = User;
