var express = require("express");
var router = express.Router();
var connection = require('../connection')
var nodemailer = require('nodemailer');


router.post("/SendVerificationMail", function(req, res, next) {
    
    const email = req.body.email;
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'virag.j@somaiya.edu',
          pass: 'dontopenthis12345'
        }
      });
      
      
      var mailOptions = {
        from: 'virag.j@somaiya.edu',
        to: email,
        subject: 'Profile Details Verified',
        text: 'Your Profile details have been verified and now you are eligible to get loans. You can visit http://localhost:3000/borrowing for more details.'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send({error:error})
        } else {
          console.log('Email sent: ' + info.response);
          res.send({success: true})

        }
      });

});
router.post("/SendProposedLoansMail", function(req, res, next) {
    
    const email = req.body.email;
    
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'virag.j@somaiya.edu',
    //       pass: 'dontopenthis12345'
    //     }
    //   });
      
      
    //   var mailOptions = {
    //     from: 'virag.j@somaiya.edu',
    //     to: email,
    //     subject: 'Profile Details Verified',
    //     text: 'Your Profile details have been verified and now you are eligible to get loans. You can visit http://localhost:3000/borrowing for more details.'
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //       res.send({error:error})
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //       res.send({success: true})

    //     }
    //   });

});

module.exports = router;