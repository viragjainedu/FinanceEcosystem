var express = require("express");
var router = express.Router();
var connection = require('../connection')
var nodemailer = require('nodemailer');
var moment = require('moment')


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
router.post("/SendProposedLoansMail", function(req, res) {
    
    const email = req.body.email;
    
    connection.query(
      "SELECT * FROM ProposedLoans where email = ?",[email],
      (err, result)=> {
        console.log(result);
        if(err){
          res.send({err:err})
        }
        
        else if(result[0].amount1 == 0 && result[0].amount2 == 0 && result[0].amount3 == 0){
          res.send({status:"Calculation Remaining"})
        }
        else{

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'virag.j@somaiya.edu',
              pass: 'dontopenthis12345'
            }
          });
          
          var htmltext = `
                          3 Months - ₹${result[0].amount1} at ${result[0].interest1}%
                          <br>
                          6 Months - ₹${result[0].amount2} at ${result[0].interest2}%
                          <br>
                          12 Months - ₹${result[0].amount3} at ${result[0].interest3}%
                          <br>
                          18 Months - ₹${result[0].amount4} at ${result[0].interest4}%
                          <br>
                          For more Info - visit http://localhost:3000/borrowing
                          `
          
          var mailOptions = {
            from: 'virag.j@somaiya.edu',
            to: email,
            subject: 'Proposed Loans based on your profile',
            html: htmltext
          };
          
          //setting status=3 of brrowing flow chart
          connection.query("UPDATE borrowing_requests set status = 3 where email = ?",[email],(err,output) => {});

          //setting MailSent = 1 of ProposedLoans
          connection.query("UPDATE ProposedLoans set MailSent = 1 where email = ?",[email],(err,output) => {});

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.send({error:error})
            } else {
              console.log('Email sent: ' + info.response);
              res.send({success: true})
    
            }
          });
        }

      }
    ) 
});

module.exports = router;