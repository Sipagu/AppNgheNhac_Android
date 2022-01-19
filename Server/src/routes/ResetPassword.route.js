const express = require('express');
const router = express.Router();

const resetPasswordController = require('../app/controllers/ResetPasswordController');

router.put('/ReceiveEmailCodeAndPassword',resetPasswordController.receiveEmailCodeAndPassword);
router.get('/ReceiveEmailAndCode',resetPasswordController.receiveEmailAndCode);
router.put('/ReceiveEmail',resetPasswordController.receiveEmail);
router.put('/',resetPasswordController.receiveEmail);

module.exports = router;