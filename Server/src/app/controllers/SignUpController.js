const User = require('../models/User');

class SignUpController {

    // [POST] /SignUp?email='values'&password='values'&name='values'&sex='values'
    index(req,res, next) {
        const hoten = req.query.name;
        const mk = req.query.password;
        const gioitinh = req.query.sex;
        const email = req.query.email;
        if(!hoten || !mk || !gioitinh || !email) {
            res.json({error: true, message: 'Vui Lòng điền đầy đủ thông tin'});
        }
        else {
            User.find({
                email : email 
            },function(err, listUser){
                if(err) {
                    console.log(err);
                    return;
                }
                if (listUser[0] !== undefined) {
                    res.json({error: true, message: 'Email này đã tồn tại'});
                    
                }
                else {             

                    User.create({
                        username : '',
                        name : hoten,
                        password : mk,
                        sex : gioitinh,
                        email : email,
                        //followPlaylist : []
                    }, function(err) {
                        if(err) {
                            res.json({error: true, message: err.message});
                            console.log(err.message)
                        }
                        else {
                            res.json({error: false, message: 'Đăng Ký thành công'});
                        }
                    })
                }
            })
        }
    }
}

module.exports = new SignUpController;