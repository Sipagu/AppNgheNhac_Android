const express = require('express');
const router = express.Router();

const manageController = require('../app/controllers/ManageController');

const {updateImageSong} = require('./Upload.multer');
const {uploadImageSinger} = require('./Upload.multer');
const {uploadImagePlaylist} = require('./Upload.multer');
const {uploadImageCategory} = require('./Upload.multer');
const {uploadImageAlbum} = require('./Upload.multer');

//===========================    Song    ======================================
router.put('/Song/editSong',manageController.editSong);
router.delete('/Song/:idSong',manageController.deleteSong);
router.get('/Song/:idSong',manageController.detailSong);
router.get('/SongImage/:idSong',manageController.songImage);
router.put('/SongImage/updateSongImage', updateImageSong.single('image'), manageController.updateSongImage);
router.get('/Song',manageController.listSong);
router.get('/',manageController.listSong);
//=============================================================================

//===========================   SINGER  =======================================
router.put('/Singer/editSinger',manageController.editSinger);
router.delete('/Singer/:idSinger',manageController.deleteSinger);
router.get('/Singer/:idSinger',manageController.detailSinger);
router.get('/SingerImage/:idSinger',manageController.singerImage);
router.put('/SingerImage/updateSingerImage', uploadImageSinger.single('image'), manageController.updateSingerImage);
router.get('/Singer',manageController.listSinger);
//=============================================================================

//===========================   PLAYLIST  =====================================
router.put('/Playlist/editPlaylist',manageController.editPlaylist);
router.delete('/Playlist/:idPlaylist',manageController.deletePlaylist);
router.get('/Playlist/:idPlaylist',manageController.detailPlaylist);
router.get('/PlaylistImage/:idPlaylist',manageController.playlistImage);
router.put('/PlaylistImage/updatePlaylistImage', uploadImagePlaylist.single('image'), manageController.updatePlaylistImage);
router.get('/Playlist',manageController.listPlaylist);
//=============================================================================

//===========================   CATEGORY  =====================================
router.put('/Category/editCategory',manageController.editCategory);
router.delete('/Category/:idCategory',manageController.deleteCategory);
router.get('/Category/:idCategory',manageController.detailCategory);
router.get('/CategoryImage/:idCategory',manageController.categoryImage);
router.put('/CategoryImage/updateCategoryImage', uploadImageCategory.single('image'), manageController.updateCategoryImage);
router.get('/Category',manageController.listCategory);

//===========================   ALBUM  ========================================
router.put('/Album/editAlbum',manageController.editAlbum);
router.delete('/Album/:idAlbum',manageController.deleteAlbum);
router.get('/Album/:idAlbum',manageController.detailAlbum);
router.get('/AlbumImage/:idAlbum',manageController.albumImage);
router.put('/AlbumImage/updateAlbumImage', uploadImageAlbum.single('image'), manageController.updateAlbumImage);
router.get('/Album',manageController.listAlbum);
//=============================================================================

module.exports = router;