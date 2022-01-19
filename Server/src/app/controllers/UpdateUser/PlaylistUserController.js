const User = require('../../models/User');
const PlaylistUser = require('../../models/PlaylistUser');
const Song = require('../../models/Song');
const {removeNewObjectID} = require('../../../util/RemoveNewObjectID');
class PlaylistUserController{

    //[GET] /updateuser/LoadPlaylistUser?idUser='values'
    loadPlaylistUser(req,res){
        if(!req.query.idUser){
            res.json({error: true, message: 'Lỗi Id User bị trống'});
        }
        else{
            User.find({_id: req.query.idUser}).exec(function(err, user){
                if(!user){
                    res.json({error: true, message: 'Lỗi User chưa được đăng ký'});
                }
                else{
                    PlaylistUser.find({idUser: req.query.idUser}).exec(function(err, playlistUser){
                        if(err){
                            if(err) res.json({ error: true, message: err.message });
                        }else{
                            res.json({
                                error: false,
                                message: '',
                                listPlayListUser : playlistUser
                            });
                        }
                    });
                }
                
            });
        }
    }
    //[POST] /updateuser/CreatePlaylistUser?idUser='values'&playlistName='values'
    createPlaylistUser(req,res) {
        if(!req.query.idUser){
            res.json({error: true, message: 'Lỗi Id User bị trống'});
        }
        else if(!req.query.playlistName){
            res.json({error: true, message: 'Lỗi tên playlist không được để trống'});
        }
        else{
            User.find({_id: req.query.idUser}).exec(function(err, user){
                if(!user){
                    res.json({error: true, message: 'Lỗi User chưa được đăng ký'});
                }
                else{
                    const playlistUser = new PlaylistUser(req.query);
                    playlistUser.save()
                                .then(function(){
                                    res.json( {error: false, message: 'Tạo playlist thành công',playlistUser});
                                })
                                .catch(function(err){
                                    res.json( {error: true, message: err.message});
                                });    
                }
                
            });
        }
    }     

    //[POST] /updateuser/AddNewSongToPlaylistUser?idPlaylist='values'&idSong='values'
    addNewSongToPlaylistUser(req,res){
        if(!req.query.idPlaylist){
            res.json({error: true, message: 'Lỗi Id Playlist bị trống'});
        }
        else if(!req.query.idSong){
            res.json({error: true, message: 'Lỗi Id bài hát bị trống'});
        }else{
            PlaylistUser.findOne({_id: req.query.idPlaylist}).exec(function(err, playlistUser){
                Song.findOne({_id: req.query.idSong}).exec(function(err, song){
                    var isAlreadyExistSong = false; // if users has already added a song to their playlist
                    if(!playlistUser){
                        res.json({error: true, message: 'Lỗi playlist không tồn tại'});
                    }
                    else if(!song){
                        res.json({error: true, message: 'Lỗi bài hát không tồn tại'});
                    }else {
                        playlistUser.song.forEach(function(song){
                            if(removeNewObjectID(song._id.toString()) === req.query.idSong){
                                isAlreadyExistSong = true;
                            }
                        });
                        if(isAlreadyExistSong){
                            res.json({error: true, message: 'Bài hát này đã có trong playlist ' + playlistUser.playlistName });
                        }else{
                            PlaylistUser.findOneAndUpdate({_id: req.query.idPlaylist}, {$push: {song: song}},function(err, playlistUser){
                                if(err) res.json({ error: true, message: err.message });
                                else {
                                    res.json({error: false, message: 'Đã thêm bài hát vào playlist ' + playlistUser.playlistName});
                                }
                            });
                        }
                    }
                });
            });
        }
    }

    //[DELETE] /updateuser/RemovePlaylistUser?idPlaylist='values'
    removePlaylistUser(req,res){
        if(!req.query.idPlaylist){
            res.json({error: true, message: 'Lỗi Id Playlist bị trống'});
        }else{
            PlaylistUser.findOneAndDelete({_id: req.query.idPlaylist}).exec(function(err,playlistUser) {
                if(err) res.json({error: true, message: err.message });
                else if(!playlistUser){
                    res.json({error: true, message: 'Lỗi playlist không tồn tại'});
                }else{
                    res.json({error: false, message: 'Đã xóa playlist ' + playlistUser.playlistName});
                }
            });
        }
    }
    
    //[DELETE] /updateuser/RemoveSongFromPlaylistUser?idPlaylist='values'&idSong='values'
    removeSongFromPlaylistUser(req,res){
        if(!req.query.idPlaylist){
            res.json({error: true, message: 'Lỗi Id Playlist bị trống'});
        }
        else if(!req.query.idSong){
            res.json({error: true, message: 'Lỗi Id bài hát bị trống'});
        }else{
            PlaylistUser.findOne({_id: req.query.idPlaylist}).exec(function(err, playlistUser){
                Song.findOne({_id: req.query.idSong}).exec(function(err, song){
                    if(err) res.json({error: true, message: err.message });
                    else if(!playlistUser){
                        res.json({error: true, message: 'Lỗi playlist không tồn tại'});
                    }
                    else if(!song){
                        res.json({error: true, message: 'Lỗi bài hát không tồn tại'});
                    }else{
                        PlaylistUser.findOneAndUpdate({_id: req.query.idPlaylist}, {$pull: {song: {_id: req.query.idSong}}}).exec(function(err, playlistUser){
                            if(err) res.json({ error: true, message: err.message });
                            else {
                                res.json({error: false, message: 'Đã xóa bài hát khỏi playlist ' + playlistUser.playlistName});
                            }
                        });
                    }
                });
            });
        }
    }

    //[GET] /updateuser/ShowSongFromPlaylistUser?idPlaylist='values'
    showSongFromPlaylistUser(req, res) {
        if(!req.query.idPlaylist){
            res.json({error: true, message: 'Lỗi Id Playlist bị trống'});
        }
        else {
            PlaylistUser.findOne({_id: req.query.idPlaylist}).exec(function(err, playlistUser) {
                if(err) res.json({ error: true, message: err.message });
                else {
                    if(!playlistUser) {
                        res.json({error: true, message: 'Lỗi Id Playlist chưa được tạo'});
                    }
                    else{
                        res.json({error: false, message: '', playlistUser});
                    }
                }
            })
        }
    }

    //[PUT] /updateuser/UpdateNameFromPlaylistUser?idPlaylist='values'&namePlaylist='value'
    updateNameFromPlaylistUser(req,res) {
        if(!req.query.idPlaylist){ 
            res.json({error: true, message: 'Lỗi Id Playlist bị trống'});
        }
        else if (!req.query.namePlaylist) {
            res.json({error: true, message: 'Lỗi name Playlist bị trống'});
        }
        else {
            PlaylistUser.findOneAndUpdate({_id: req.query.idPlaylist}, {$set: {playlistName: req.query.namePlaylist}},function(err, playlistUser){
                if(!playlistUser){
                    res.json({error: true, message: 'Play list này không tồn tại'});
                }
                else {
                    if(err) res.json({ error: true, message: err.message });
                    else {
                    res.json({error: false, message: 'Sửa tên playlist thành Công'});
                }
                }
            });
        }
    }
}

module.exports = new PlaylistUserController;