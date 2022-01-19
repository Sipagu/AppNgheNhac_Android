const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = require('./SongSchema');

const playlistUser = new Schema({
    idUser: String,
    playlistName: String,
    song: [Song]
 }, 
    {
        versionKey: false
    }
 );

module.exports = playlistUser;