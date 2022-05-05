var express = require('express');
var router = express.Router();
var connection = require('../connection');
var nodemailer = require('nodemailer');
// https://www.npmjs.com/package/otp-generator
const otpGenerator = require('otp-generator')

router.post('/', (req, res) => {

    const email = req.body.email;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'virag.j@somaiya.edu',
          pass: 'dontopenthis12345'
        }
      });
      
      var OTP =  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets: false  });
      console.log(OTP);
      
      var mailOptions = {
        from: 'virag.j@somaiya.edu',
        to: email,
        subject: 'OTP for Financial Ecosystem Registration',
        text: OTP
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.send(OTP);
    
});

router.post('/CommonOTP', (req, res) => {

    const email = req.body.email;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'virag.j@somaiya.edu',
          pass: 'dontopenthis12345'
        }
      });
      
      var OTP =  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets: false  });
      console.log(OTP);
      
      var mailOptions = {
        from: 'virag.j@somaiya.edu',
        to: email,
        subject: 'OTP',
        text: OTP
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.send(OTP);
    
});

module.exports = router;