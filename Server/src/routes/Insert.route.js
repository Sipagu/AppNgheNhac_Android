const express = require('express');
const router = express.Router();

const InsertCategoryController = require('../app/controllers/Insert/InsertCategoryController');
const InsertSingerController = require('../app/controllers/Insert/InsertSingerController');
const InsertPlaylistController = require('../app/controllers/Insert/InsertPlaylistController');
const InsertSongController = require('../app/controllers/Insert/InsertSongController');
const InsertAlbumController = require('../app/controllers/Insert/InsertAlbumController');

const {uploadImageSinger} = require('./Upload.multer');
const {uploadImagePlaylist} = require('./Upload.multer');
const {uploadImageSong} = require('./Upload.multer');
const {uploadImageAlbum} = require('./Upload.multer');
const {uploadImageCategory} = require('./Upload.multer');

//insert category 
router.get('/insertCategory',InsertCategoryController.insertCategory);
router.post('/insertCategoryPost', uploadImageCategory.single('image'), InsertCategoryController.insertCategoryPost);

//insert playlist 
router.get('/insertPlaylist',InsertPlaylistController.insertPlaylist);
router.post('/insertPlaylistPost', uploadImagePlaylist.single('imagePlaylist'),InsertPlaylistController.insertPlaylistPost);

//insert song 
router.get('/insertSong',InsertSongController.insertSong);
router.post('/insertSongPost', uploadImageSong.any(),InsertSongController.insertSongPost);

//insert singer
router.get('/insertSinger',InsertSingerController.insertSinger);
router.post('/insertSingerPost', uploadImageSinger.single('image'),InsertSingerController.insertSingerPost);

//insert Album
router.get('/insertAlbum',InsertAlbumController.insertAlbum);
router.post('/insertAlbumPost', uploadImageAlbum.single('image'),InsertAlbumController.insertAlbumPost);
//==========================================================================
router.use('/',InsertCategoryController.index);

module.exports = router;