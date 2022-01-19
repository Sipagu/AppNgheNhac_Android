const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.post('/loginPost',adminController.loginPost);
router.use('/logout',adminController.logout);
router.get('/login',adminController.login);
router.use('/',adminController.login);

module.exports = router;