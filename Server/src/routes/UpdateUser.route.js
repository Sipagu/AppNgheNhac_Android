const express = require('express');
const router = express.Router();

const updateUserController = require('../app/controllers/UpdateUser/UpdateUserController');
const updateUserPasswordController = require('../app/controllers/UpdateUser/UpdateUserPasswordController');
const playlistUserController = require('../app/controllers/UpdateUser/PlaylistUserController');

const {uploadImageAvatarUser} = require('./Upload.multer')

router.get('/LoadPlaylistUser',playlistUserController.loadPlaylistUser);
router.delete('/RemovePlaylistUser',playlistUserController.removePlaylistUser);
router.delete('/RemoveSongFromPlaylistUser',playlistUserController.removeSongFromPlaylistUser);
router.post('/AddNewSongToPlaylistUser',playlistUserController.addNewSongToPlaylistUser);
router.post('/CreatePlaylistUser',playlistUserController.createPlaylistUser);
router.get('/ShowSongFromPlaylistUser',playlistUserController.showSongFromPlaylistUser);
router.put('/UpdateNameFromPlaylistUser',playlistUserController.updateNameFromPlaylistUser);
router.put('/UpdateAvatarUser',uploadImageAvatarUser.single('image'),updateUserController.insertAvatarUser);

router.put('/UpdatePassword',updateUserPasswordController.index);

router.put('/RemoveFavoriteSinger',updateUserController.removeFavoriteSinger); // this method is called on phone
router.put('/AddFavoriteSinger',updateUserController.addFavoriteSinger); // this method is called on phone
router.put('/AddManyFavoriteSinger',updateUserController.addManyFavoriteSinger); // this method is called on phone
router.put('/AddLoveOrRemovePlaylist',updateUserController.addLovePlaylist);
router.put('/AddLoveOrRemoveAlbum',updateUserController.addLoveAlbum);
router.put('/',updateUserController.index);

module.exports = router;