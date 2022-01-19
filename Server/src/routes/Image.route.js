const express = require('express');
const router = express.Router();

const imageSingerController = require('../app/controllers/Image/ImageSingerController');
const imageAlbumController = require('../app/controllers/Image/ImageAlbumController');
const imagePlaylistController = require('../app/controllers/Image/ImagePlaylistController');
const imageSongController = require('../app/controllers/Image/ImageSongController');
const imageCategoryController = require('../app/controllers/Image/ImageCategoryController');
const imageUpdaterUserController = require('../app/controllers/Image/ImageAvatarUserController');

router.use('/imagesong/:imageName',imageSongController.display);
router.use('/imageplaylist/:imageName',imagePlaylistController.display);
router.use('/imagesinger/:imageName',imageSingerController.display);
router.use('/imagecategory/:imageName',imageCategoryController.display);
router.use('/imageAlbum/:imageName',imageAlbumController.display);
router.use('/imageuser/:imageName',imageUpdaterUserController.display);

router.use('/',imageSingerController.index);

module.exports = router;