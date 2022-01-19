const express = require('express');
const router = express.Router();

const albumController = require('../app/controllers/AlbumController');


router.use('/getSongInAlbum',albumController.getSongInAlbum);
router.use('/getListFavoriteAlbum',albumController.getListFavoriteAlbum);
router.use('/getSingerAlbum',albumController.getSingerAlbum);
router.use('/getAllAlbum',albumController.getAllAlbum);
router.use('/',albumController.getAllAlbum);

module.exports = router;