const Admin = require('../models/Admin');

class AdminController {

    // [GET] /admin/login
    login(req, res) {
        if(req.session && (req.session.username == undefined)) res.render('login',{isLogin: false}); // if admin still not login
        else res.redirect('/'); // go to home if admin logged
    }
    // [POST] /admin/loginPost
    loginPost(req, res) {
        Admin.findOne({username: req.body.username, password: req.body.password}).exec(function (err, admin){
            if(admin != null){
                req.session.username = admin.username;
                req.session.password = admin.password;
                req.session.name = admin.name;
                res.redirect('/')
            }else {
                res.render('login', {message: 'tài khoản hoặc mật khẩu không đúng'});
            }
        });
    }
    // [GET] /admin/logout
    logout(req, res) {
        if(req.session){
            req.session.destroy();
            res.redirect('/');
        }
        else res.redirect('/');
    }
}

module.exports = new AdminController;