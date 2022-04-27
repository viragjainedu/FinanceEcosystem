var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment');
const { connect } = require("../connection");
var nodemailer = require('nodemailer');

router.post("/getInstallments", function(req, res) {

    const email = req.body.email;

    connection.query("Select * from installments where email = ?",[email],(err,result) =>{
        if(err){console.log(err)}
        else{
            if(result.length > 0){
                // console.log(result)
                res.send(result)

            }else{
                res.send([])
            }
        }
    })

});


router.post("/pay", function(req, res) {

    const email = req.body.email;
    const installment_amount = req.body.installment_amount;
    const amount_borrowed = req.body.amount_borrowed;
    const installment_id = req.body.installment_id;

    connection.query("update installments set status = 'Paid' where installment_id = ?",
    [installment_id],
    (err,result) =>{
        if(err){console.log(err)}
        else{
            console.log("Outside lenders data")
            connection.query("Select * from lenders_data",[],(err,result) => {
                if(err){console.log(err)}
                else{
                    if(result.length >0 ){
                        console.log("inside lenders data")
                        for (var i = 0; i < result.length; i++) {
                            var BorrowerNo = -1;
                            //calculating borrowerNo
                            for (let j = 0; j < 10; j++) {
                                if(result[i][`b${j}`] ===  email){
                                    BorrowerNo = j;
                                    break;
                                }
                            }
                            console.log(BorrowerNo);
                            if(BorrowerNo === -1){
                                continue;
                            }else if(BorrowerNo !== -1){
                                
                                console.log(`Borrower No is ${BorrowerNo}`)
                                var ratio = (result[i].fixed_lending_amount/amount_borrowed)
                                var cut_for_lender = (installment_amount * ratio)
                                var principal_for_borrower = (amount_borrowed/result[i].lock_in_period)
                                var principal_for_lender = ratio * principal_for_borrower
                                var interest_for_borrower = (installment_amount - principal_for_borrower)
                                var interest_for_lender = ratio*interest_for_borrower
                                console.log(ratio)
                                console.log(cut_for_lender)
                                console.log(principal_for_borrower)
                                console.log(principal_for_lender)
                                console.log(interest_for_borrower)
                                console.log(interest_for_lender)
                                connection.query("INSERT INTO returns (email,borrower_email,return_amount,principal,interest,date_of_payment) values(?,?,?,?,?,?);",
                                    [result[i].email,email,cut_for_lender,principal_for_lender,interest_for_lender,moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
                                    (err,output) => {
                                        if(err){console.log(err)}
                                        else{
                                            
                                        }
                                    }
                                )
                            }

                            
                        }

                    }
                }
            })
            //sending mail successfull
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
                subject: 'Payment Of Installment',
                text: `Your installment amount of Rs.${installment_amount} of Loan Rs.${amount_borrowed} has been paid.`
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
        
            res.send({message: "Paid Successfully"})     
        }
    })

});

module.exports = router;