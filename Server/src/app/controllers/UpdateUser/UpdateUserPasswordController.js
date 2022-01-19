const User = require('../../models/User');

class UpdateUserPasswordController{

    //[PUT] UpdateUser/UpdatePassword?email="value"&oldPassword="value"&newPassword="value"
    index(req,res, next) {
        const email = req.query.email;
        const oldPassword = req.query.oldPassword;
        const newPassword = req.query.newPassword;

        if(!email || !oldPassword || !newPassword) {
            res.json({
                error: true,
                message : "Vui lòng điền đầy đủ thông tin"
            })
        }
        else{
            User.findOne({ email : email}, function(err, user) {
                if(!err) {
                    if(!user) {
                        res.json({
                            error: true,
                            message : "Email này chưa tồn tại"
                        })
                    }
                    else {
                        if(user.password === oldPassword) {
                            user.password = newPassword;
                            user.save(function(err1) {
                                if(!err1) {
                                    res.json({
                                        error: false,
                                        message : "Thay đổi mật khẩu thành công",
                                        user
                                    })
                                    console.log(user)
                                }
                                else{
                                    console.log(err);
                                }
                            })
                        }
                        else {
                            res.json({
                                error: true,
                                message : "Mật Khẩu hiện tại không khớp",
                            })
                        }
                    }
                }
                else {
                    console.log(err);
                }
            })
        }
    } 
}

module.exports = new UpdateUserPasswordController;