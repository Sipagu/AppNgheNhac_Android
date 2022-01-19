const path = require('path');
const mediaserver = require('mediaserver');

class StreamSongController {
    
    index(req, res) {
        res.json({message: 'StreamSong Page'});
    }

    // [GET]  /:SongName
    streamSong(req, res) {
        // const songName = req.originalUrl.split('/')[2]; // get song name => localhost:3000/streamsong/ (songname.mp3)
        const songName = req.params.songName; // get song name => localhost:3000/streamsong/ (songname.mp3)
        console.log(songName);
        if(!songName.includes('.mp3')) {
            res.json({
                error: true,
                message: 'không phải file nhạc'
            });
        }
        else{
            const pathSong = path.join(__dirname, '../../','public','song', songName);
            mediaserver.pipe(req,res,pathSong);
        }
    }

}

module.exports = new StreamSongController;