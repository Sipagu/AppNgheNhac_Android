const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
    user: 'teacupmusicmp3@gmail.com',
    pass: 'teacupmusicmp3123'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

function sendEmailResetPassword(email,resetCode){
    const mailOptions = {
        from: 'teacupmusicmp3@gmail.com',
        to: email,
        subject: 'Reset Password Teacup Music',
        text: 'Mã TeaCup Music của bạn là: ' + resetCode + '. Vui lòng không chia sẽ mã này với bất kì ai.'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmailResetPassword
}