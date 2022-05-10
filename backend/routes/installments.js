var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment');
var async = require('async');
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
            connection.query("Select * from lenders_data",[],(err,response) => {
                if(err){console.log(err)}
                else{
                    if(response.length >0 ){
                        console.log("inside lenders data")
                        async.eachSeries(response,function(result,callback){
                            var BorrowerNo = -1;
                            //calculating borrowerNo
                            for (let j = 0; j < 10; j++) {
                                if(result[`b${j}`] ===  email){
                                    BorrowerNo = j;
                                    break;
                                }
                            }
                            console.log(BorrowerNo);
                            if(BorrowerNo === -1){
                                console.log(result['lenders_id'])
                                callback()
                            }else if(BorrowerNo !== -1){
                                
                                console.log(`Borrower No is ${BorrowerNo}`)
                                var ratio = (result.fixed_lending_amount/amount_borrowed)
                                var cut_for_lender = (installment_amount * ratio)
                                var principal_for_borrower = (amount_borrowed/result.lock_in_period)
                                var principal_for_lender = ratio * principal_for_borrower
                                var interest_for_borrower = (installment_amount - principal_for_borrower)
                                var interest_for_lender = ratio*interest_for_borrower
                                var borrower_email = email

                                console.log(ratio)
                                console.log(cut_for_lender)
                                console.log(principal_for_borrower)
                                console.log(principal_for_lender)
                                console.log(interest_for_borrower)
                                console.log(interest_for_lender)

                                //adding transactions in returns for lender;
                                 connection.query("INSERT INTO returns (lenders_id,email,borrower_email,return_amount,principal,interest,date_of_payment) values(?,?,?,?,?,?,?);",
                                    [result['lenders_id'],result.email,email,cut_for_lender,principal_for_lender,interest_for_lender,moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
                                    (err,output) => {
                                        if(err){console.log(err)}
                                        else{

                                            // lenders account stats
                                            connection.query("select * from account_stats where email = ?",[result.email],(err,rows)=>{
                                                if(err){console.log(err)}
                                                else{
                                                    console.log(`Total interest Recieved : ${rows[0].total_interest_received}`)
                                                    
                                                    connection.query("Update account_stats set total_interest_received = ? , balance = ? where email = ?",
                                                    [rows[0].total_interest_received + interest_for_lender , rows[0].balance + principal_for_borrower + interest_for_lender ,rows[0].email],
                                                    (err,ouput) =>{
                                                        if(err){console.log(err)}

                                                        //updating account stats adding interest of borrower to his interest paid
                                                        connection.query("select * from account_stats where email = ?",[borrower_email],(err,rows)=>{
                                                            if(err){console.log(err)}else{
                                                                connection.query("Update account_stats set total_interest_paid = ?  where email = ?",
                                                                [rows[0].total_interest_paid + interest_for_borrower , borrower_email],
                                                                (err,ouput) =>{
                                                                    if(err){console.log(err)}
                                                                    callback();
                                                                }
                                                                )
                                                            }
                                                        })
                                                    }
                                                )
                                                }
                                            })

                                        }
                                    }
                                )
                                   
                            }
                            
                        }, function(err, results) {
                            if(err){console.log(err)}else{
                                //for completed loans 
                                connection.query("select * from installments where email = ?",[email],(err,output)=>{
                                    var flag = false;
                                    for (let i = 0; i < output.length; i++) {
                                        if(output[i].status === 'Paid'){
                                            continue;
                                        }else{
                                            flag = true //means pending
                                            break;
                                        }
                                    }
                                    if(flag === false){
                                        //loan completed
                                        connection.query("Insert into CompletedLoans select * from installments where email = ?",[email],(err,rows)=>{})
                                    }
                                })
                            }
                            console.log(""); // Output will the value that you have inserted in array, once for loop completed ex . 1,2,3,4,5,6,7,8,9
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
                                    res.send({message: "Paid Successfully"})
                            }
                            });
                        
                        });
                    }
                }
            })
     
        }
    })

});

module.exports = router;