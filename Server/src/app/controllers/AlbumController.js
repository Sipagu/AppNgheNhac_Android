const Album = require('../models/Album');
const Singer = require('../models/Singer');
const Song = require('../models/Song');
const {removeArrayNewObjectID} = require('../../util/RemoveNewObjectID');
class AlbumController {

    // [GET] /album/getAllAlbum
    async getAllAlbum(req, res) { // get all album
        try {
            const albums = await Album.find({});
            if(albums){
                res.json({ error: false, message: '', albums });
                
            }else{
                res.json({ 
                    error: true, message: 'lỗi không thể lấy được bài hát'
                })
            }
        } catch (error) {
            res.json({ error: true, message: err.message });
        }
        
    }

    // [GET] /album/getSingerAlbum?idSinger="value"
    async getSingerAlbum(req, res){
        try {
            if(req.query.idSinger){
                const albums = await Album.find({ 'singer._id': req.query.idSinger});

                if(albums) {
                    res.json({ error: false, message: '', albums });
                }
                else {
                    res.json({ error: true, message: 'Không tìm thấy ca sĩ' });
                }
            }else{
                res.json({ error: true, message: 'Vui lòng điền ID ca sĩ' });
            }
        } catch (error) {
            res.json({ error: true, message: 'ID ca sĩ có thể không tồn tại', note:  error.message});
        }
    }

    // [GET] /album/getListFavoriteAlbum
    async getListFavoriteAlbum(req, res){
        try {
            if(!req.body.singerId){
                res.json({ error:true, message: 'ID ca sĩ không được để trống' });
            }
            const singerIds = await Singer.find({_id: {$in:req.body.singerId}}, '_id')
            if(singerIds.length !== 0){ // singer is not empty
                const newSingerId = removeArrayNewObjectID(singerIds); // get only singerids which are in mongodb
                const albums = await Album.find({'singer._id': newSingerId})
                if(albums.length !== 0){ // album is not empty
                    res.json({
                        error: false, message: '', albums
                    });
                }
                else{
                    res.json({ error:true, message: 'Không có album của những ca sĩ này' });
                }
            }
            else{
                res.json({ error:true, message: 'Không tìm thấy Ca sĩ' });
            }
        } catch (error) {
            res.json({ error:true, message: 'ID ca sĩ có thể không hợp lệ', note: error.message});
        }
        
    }

    // [GET] /album/getListFavoriteAlbum?albumId='values'
    async getSongInAlbum(req, res){
        try {
            const album = await Album.findById(req.query.albumId);
            if(album){ // if album
                const songs = await Song.find({albumid: album._id});
                if(songs.length !== 0){
                    res.json({ error: false, message: '', albumName: album.albumname, songs });
                }
                else{
                    res.json({ error:true, message: 'Không tìm thấy bài hát trong album này' });
                }
            }
            else{
                res.json({ error:true, message: 'Không tìm thấy Album' });
            }
        } catch (error) {
            res.json({ error:true, message: 'ID Album có thể không hợp lệ', note: error.message });
        }
    }
}

module.exports = new AlbumController;