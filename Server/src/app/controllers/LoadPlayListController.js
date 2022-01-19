const Playlist = require('../models/Playlist');
const Song = require('../models/Playlist');

class LoadPlayListController {
    
    // [GET] /PlayList
    index(req,res,next) {
        Playlist.find({}, {}, function(err, listPlayList) {
            if(err) {
                res.json({
                    error : true,
                    message: err.message
                })
            }
            else {
                res.json({
                    error: false,
                    message: '',
                    listPlayList
                })
            }
        })
    }

    // [GET] /PlayList/getPlaylistByCategoryId?CategoryId='value'
    async getPlayListByIDCategory (req,res) {
        try{
            if(!req.query.CategoryId){
                res.json({ error: true, message: 'ID thể loại trống'});
            }
            else {
                const listPlayList = await Playlist.find({"category._id" : req.query.CategoryId });
                if (!listPlayList[0]) {
                    res.json({ error: true, message: 'Thể loại này không tồn tại'});
                }
                else {
                    res.json({ error: false, message: '', listPlayList});
                }
            }
        }
        catch (error) {
            res.json({ error: true, message: "Sai id Thể Loại" });
            console.log(error.message);
        }
    }
    
}

module.exports = new LoadPlayListController;