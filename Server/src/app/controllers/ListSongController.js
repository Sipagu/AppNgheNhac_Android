const Song = require('../models/Song');
const Singer = require('../models/Singer');
class ListSongController {

    // [GET] /listsong
    index(req, res) {
        console.log('session : ' + req.session.id);
        if(Object.keys(req.query).length === 0) console.log('không có tham số truyền vào');
        Song.find({}, function (err, listSong) {
            if(!err) res.json( {
                error: false,
                message: '',
                listSong
            });
            else res.json( {
                error: true,
                message: err.message
            });
          });
    }

    // [GET] /listsong/singer?singerid='values'
    async getListSongBySingerID(req, res) {
        try {
            if(!req.query.singerid){
                res.json({error: true, message: 'Không có ID Singer'});
            }
    
            const singer = await Singer.findById(req.query.singerid);
            if(singer){
                const songs = await Song.find({'singer._id': singer._id});
                res.json({ error: false, message: '', songs })
            }else{
                res.json({ error:true, message: 'Không tìm thấy ca sĩ' });
            }
        } catch (error) {
            console.log(error);
            res.json({ error:true, message: 'ID ca sĩ có thể không hợp lệ', note: error.message});
        }
    }

}

module.exports = new ListSongController;