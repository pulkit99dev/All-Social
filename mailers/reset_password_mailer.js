// const nodeMailer = require('../config/nodemailer');

// exports.newpassword = (password) => {
//     let htmlString = nodeMailer.renderTemplate({password:password},'/resetpassword/new_password.ejs');
//     nodeMailer.transporter.sendMail({
//         from: "kunalswami29@gmail.com",
//         to: password.user.email,
//         subject : "reset password",
//         html: htmlString
//     },(err,info) => {
//         if(err){console.log('error in sending mails',err); return;}
//         // console.log('Message Sent',info);
//         return; 
//     });
// }
