const express = require('express');
const router = express.Router();

const loadPlayListController = require('../app/controllers/LoadPlayListController');

router.use('/getPlaylistByCategoryId',loadPlayListController.getPlayListByIDCategory)
router.use('/',loadPlayListController.index);

module.exports = router;