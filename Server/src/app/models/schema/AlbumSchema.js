const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Singer = require('./SingerSchema');
const ListSong = require('./SongSchema');

const Album = new Schema({
    albumname: String,
    singer: Singer,
    imageAlbum: String,
}, 
    {
        versionKey: false,
        timestamps: true,
        dropDups: true
    }
);

module.exports = Album;