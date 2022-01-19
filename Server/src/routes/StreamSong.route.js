const express = require('express');
const router = express.Router();

const streamSongController = require('../app/controllers/StreamSongController');

router.use('/:songName',streamSongController.streamSong);
router.use('/',streamSongController.index);

module.exports = router;