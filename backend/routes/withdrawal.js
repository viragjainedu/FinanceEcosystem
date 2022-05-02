var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment');
// var async = require('async');
// var nodemailer = require('nodemailer');

router.post("/getWithdrawals", function(req, res) {

    const email = req.body.email;

    connection.query("Select * from withdrawal_transaction where email = ?",[email],(err,result) =>{
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


router.post("/withdraw", function(req, res) {

    const email = req.body.email;
    const withdrawal_amount = req.body.withdrawal_amount;

    
    connection.query("Select * from account_stats where email = ?" , [email], (err,output) => {
        if(err){
            console.log(err)
            res.send({message: err})
        }
        else{
            connection.query("update account_stats set balance = ?, total_money_withdrawn = ? where email = ?" , [output[0].balance - withdrawal_amount, output[0].total_money_withdrawn + withdrawal_amount  , email], (err,rows) => {
                if(err){
                    console.log(err)
                    res.send({message: err})
                }
                else{
                    connection.query("Insert into withdrawal_transaction (email , amount_withdrawn, withdrawal_time) values(?,?,?) ",
                    [email,withdrawal_amount,moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
                    (err,result) =>{
                        if(err){
                            console.log(err)
                            res.send({message:err})
                        }
                        else{
                            res.send({success: true})
                        }
                    })
                }    
            })
        }
    });
});


module.exports = router;