'use strict';
var nodemailer = require('nodemailer');
module.exports = function(router) {
  router.get('/about', function(req,res){
    res.render('pages/about',{messages:req.flash('info')});
  });
  router.post('/send',function(req,res,next){
    var transporter = nodemailer.createTransport('smtps://zymusicstore:zymusicstore123@smtp.gmail.com');
    var mailOptions = {
      from: 'Music Store Message Service <traviszhong@gmail.com>',
      to: 'traviszhong@gmail.com',
      subject: 'Message From Music eStore',
      text: 'You have a new submission with the following details...Name: '+req.body.name+ 'Email: ' +req.body.email+ 'Message: ' + req.body.msg,
      html: '<p>You got a new submission with the following details.. </p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.msg+'</li></ul>'
    };
    transporter.sendMail(mailOptions,function(error,info){
      if(error){
        console.log(error);
      }else{
        req.flash('info','Message has been sent!');
        console.log('Message sent: ' + info.response);
      }
      res.redirect('/pages/about');
    });
  });
}
