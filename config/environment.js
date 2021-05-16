const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path: logDirectory
});

const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key : 'pfbE374PM3DRBDjp1JE1fF0Pqz9kIskz',
    db :'codeial_development',
    smtp : {
        service:'gmail',
        host :'smtp.gmail.com',
        port : 587,
        secure: false,
        auth:{       /// here users mail id from which we need to send the mail
            user: 'pulkitnagpal987654321@gmail.com', //users email id
            pass: '991@technocrat'    // for now password is hide use when required
        }     
    },
    google_client_ID:"696495007797-a5hqfqda2oq254egjp2ornavl9kdn2u0.apps.googleusercontent.com",
    google_client_Secret:"B7zvSg9xL3QY6LsjIqUINWnG",
    google_call_back_URL: "http://localhost:8000/user/auth/google/callback",

    jwt_secret : 'codeial',
    morgan:{
        mode:'dev',
        options:{stream: accessLogStream}
    }

};
const production = {
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db :process.env.CODEIAL_db,
    smtp : {
        service:'gmail',
        host :'smtp.gmail.com',
        port : 587,
        secure: false,
        auth:{       /// here users mail id from which we need to send the mail
            user: process.env.CODEIAL_GMAIL_USERNAME, //users email id
            pass: process.env.CODEIAL_GMAIL_PASSWORD   // for now password is hide use when required
        }     
    },
    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_URL: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,

    jwt_secret : process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream: accessLogStream}
    }
}
module.exports= eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
