var express = require("express");
var router = express.Router();
var connection = require('../connection')
var nodemailer = require('nodemailer');

router.post('/', (req, res)=> {

    const email = req.body.email;

    connection.query(
      "SELECT * from person where email = ?",
      [email],
      (err, result)=> {
        if(result.length <= 0){
          res.send({failure:"Email is not registered"})
        }else{
          connection.query(
            "Select password from person where email = ?",
            [email],
            (err, result)=> {
                
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
                    subject: 'Forgot Password',
                    text: `Your Profile Password is ${result[0].password}`
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

                
              res.send({"success":"Mail Sent Successfully"})
            }
          );
        }
        console.log(result);
      }
    );
    
 });

module.exports = router;