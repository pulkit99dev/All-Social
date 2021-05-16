const queue = require('../config/kue');
 const commentsMailer = require('../mailers/comments_mailer');
// this tells the worker to projess the job in this funtion
 queue.process('emails',function(job,done){
     console.log('emails worker is processing a job',job.data);
     commentsMailer.newcomment(job.data);

     done();
 });
