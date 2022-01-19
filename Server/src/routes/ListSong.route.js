const express = require('express');
const router = express.Router();

const listSongController = require('../app/controllers/ListSongController');
const listSongByIDController = require('../app/controllers/ListSongByIDController');


router.get('/singer',listSongController.getListSongBySingerID);
router.use('/playlist',listSongByIDController.index);
router.use('/album',listSongByIDController.getListSongByAlbumId)
router.use('/',listSongController.index);

module.exports = router;