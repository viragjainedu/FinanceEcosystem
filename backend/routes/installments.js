var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment');
const { connect } = require("../connection");

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
                                var cut = (installment_amount * (result[i].fixed_lending_amount/amount_borrowed).toFixed(2)).toFixed(2)
                                var principal = (amount_borrowed/result[i].lock_in_period).toFixed(2)
                                var interest = (installment_amount - principal).toFixed(2)
                                connection.query("INSERT INTO returns (email,borrower_email,return_amount,principal,interest,date_of_payment) values(?,?,?,?,?,?);",
                                    [result[i].email,email,cut,principal,interest,moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
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
            res.send({message: "Paid Successfully"})     
        }
    })

});

module.exports = router;