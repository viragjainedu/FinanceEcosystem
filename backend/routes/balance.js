var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');


router.get("/", function(req, res, next) {

    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'virag.j@somaiya.edu',
          pass: 'dontopenthis12345'
        }
      });
      
      var mailOptions = {
        from: 'virag.j@somaiya.edu',
        to: 'keval.dk@somaiya.edu',
        subject: 'Sending Email using Node.js',
        text: 'That was easy fucker!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send({"Email": "Sent"})

});

module.exports = router;