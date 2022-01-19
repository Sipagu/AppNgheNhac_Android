const express = require('express');
const router = express.Router();

const ListCategoriesController = require ('../app/controllers/ListCategoriesController');

router.use('/getAllCategories',ListCategoriesController.getAllCategories);
router.use('/',ListCategoriesController.getAllCategories);

module.exports = router;