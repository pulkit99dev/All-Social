const nodeMailer= require('../config/nodemailer');

exports.newcomment = (comment) => {
    
    let htmlString= nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: "kunalswami29@gmail.com",
        to: comment.user.email,
        subject: "New comment Published",
        html: htmlString
    },(err,info) => {
        if(err){console.log('error in sending mails',err); return;}
        // console.log('Message Sent',info);
        return; 
    });
}