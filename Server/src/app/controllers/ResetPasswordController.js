const User = require('../models/User');
const {sendEmailResetPassword} = require('../../util/sendEmail');
class ResetPasswordController {

    // [PUT] /ResetPassword/ReceiveEmail?email='?' or /ResetPassword/ReceiveEmail?email='?'
    receiveEmail(req, res) {
        const resetCode = Math.floor(100000 + Math.random() * 900000); // generate random code
        User.findOneAndUpdate({ email: req.query.email}, {resetCode}).exec(function(err, user) {
            if(err) res.json({ error: true, message: err.message });
            if(user === null) {
                res.json({ error: true, message: 'Email không tồn tại'});
            }else {
                sendEmailResetPassword(req.query.email,resetCode)// if send email success
                res.json({
                    error: false,
                    message: 'Chúng tôi đã gửi mã xác nhận về Email của bạn, vui lòng kiểm tra hòm thư hoặc nếu bạn không tìm thấy tin nhắn hãy kiếm tra thư rác',
                    email: req.query.email
                });
            }
        });
    }

    // [GET] /ReceiveEmailAndCode?email='?'&resetCode='?'
    receiveEmailAndCode(req, res){
        User.findOne({ email: req.query.email}).exec(function(err, user){
            if(err) res.json({ error: true, message: err.message });
            else if(user === null) {
                res.json({ error: true, message: 'Email không tồn tại'});
            }
            else if(user.resetCode != req.query.resetCode){
                res.json({ error: true, message: 'Mã không chính xác!!!'});
            }else{
                res.json({
                    error: false,
                    message: 'Mã hợp lệ',
                    resetCode: req.query.resetCode,
                    email: req.query.email
                });
            }
        });
    }

    // [PUT] /ReceiveEmailCodeAndPassword?email='?'&resetCode='?'&password='?'
    receiveEmailCodeAndPassword(req, res){
        User.findOne({ email: req.query.email}).exec(function(err, user){
            if(err) res.json({ error: true, message: err.message });
            else if(user === null) {
                res.json({ error: true, message: 'Email không tồn tại'});
            }
            else if(user.resetCode != req.query.resetCode){
                res.json({ error: true, message: 'Mã không chính xác!!!'});
            }else{
                User.findOneAndUpdate({ email: req.query.email }, {password: req.query.password, $unset: {resetCode: 1}}, function(err, user){
                    res.json({
                        error: false,
                        message: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại',
                    });
                });
            }
        });
    }
}

module.exports = new ResetPasswordController;