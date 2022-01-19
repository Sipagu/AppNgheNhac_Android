const express = require('express');
const router = express.Router();

const singerController = require('../app/controllers/SingerController');


router.get('/getListSinger',singerController.getListSinger);
router.get('/getOneSinger',singerController.getOneSinger);
router.use('/',singerController.index);

module.exports = router;