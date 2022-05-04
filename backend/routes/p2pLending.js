var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment');
// const { connect } = require("../connection");

router.post("/", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    const request_submitted = req.body.request_submitted;
    const lend_amount = req.body.lend_amount;
    console.log(request_submitted,lend_amount);
    res.send({"Response Recieved":"Yes" , "lend_amount" : lend_amount})
});

router.post("/CompleteProfile", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const DOB = req.body.DOB;
    const city = req.body.city;
    const state = req.body.state;
    const pincode = req.body.pincode;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const email = req.body.email;



    connection.query(
        "UPDATE person SET first_name = ?, last_name = ?, gender = ?, DOB = ?, city = ?, state = ?, pincode = ?, address1 = ?, address2 = ? where email = ? ;",
        [first_name, last_name,gender,DOB,city,state,pincode,address1,address2,email],
        (err, result)=> {
            if(err){
                console.log(err);
            }
            // console.log(result);
            
            //here add borrwers_Data into table
            //here add borrwers_Data into table

            res.send({"success":"Updated Succesfully"})
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/amount_lending", function(req, res, next) {
    
    const email = req.body.email;
    const amount = req.body.amount;
    const lock_in_period = req.body.lock_in_period;
    const debitFrom = req.body.debitFrom;
    const riskApetite = req.body.riskApetite;
    
    // if(debitFrom balance)
    if(debitFrom === 'balance'){
        connection.query("Select balance from account_stats where email = ?;",[email],(err,output) => { 
            if(err){console.log(err)}
            var new_balance = parseInt(output[0].balance) - parseInt(amount);
            if(new_balance < 0){
                res.send("You do not have enough balance")
            }else{
                connection.query("update account_stats set balance = ? where email = ?;",[new_balance,email],(err,x)=>{if(err){console.log(err)}})
                
                //common portion
                connection.query(
                    "INSERT INTO lending_transactions (lock_in_period, amount_lent , transaction_time ,email_id) values(?,?,?,?);",
                    [lock_in_period,amount,moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),email],
                    (err, result)=> {
                        if (err) {
                            res.send({err: err});
                        }
                        else{
            
                            // adding the same to total_money_lent
                            connection.query("Select total_money_lent from account_stats where email = ?;",[email],(err,output) => { 
                                if(err){console.log(err)}
                                var new_total_money_lent = parseInt(output[0].total_money_lent) + parseInt(amount);
                                connection.query("update account_stats set total_money_lent = ? where email = ?;",[new_total_money_lent,email],(err,x)=>{})
                            })
            
                            //add this to lenders data table
                            var v1 = 5;
                            var v2 = 5;
                            if(riskApetite === 'high') {
                                v1 = 2,
                                v2 = 8
                            }
                            if(riskApetite === 'low') {
                                v1 = 8,
                                v2 = 2
                            }

                            connection.query("INSERT into lenders_data (v1,v2,lock_in_period,email,amount_lent, amount_remaining, fixed_lending_amount,current_borrower) values (?,?,?,?,?,?,?,0);",
                                [v1,v2, lock_in_period,email,amount,amount,parseInt(amount)/10]
                                ,(err,res) => {
                                    console.log(err)
                                    console.log(res)
                                }
                            );
        
                            res.send({"Lending_status" : "Success"});
                        }
                    }
                )
            
            }
        })
    }else{
        //common portion
        connection.query(
            "INSERT INTO lending_transactions (lock_in_period, amount_lent , transaction_time ,email_id) values(?,?,?,?);",
            [lock_in_period,amount,moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),email],
            (err, result)=> {
                if (err) {
                    res.send({err: err});
                }
                else{
    
                    // adding the same to total_money_lent
                    connection.query("Select total_money_lent from account_stats where email = ?;",[email],(err,output) => { 
                        if(err){console.log(err)}
                        var new_total_money_lent = parseInt(output[0].total_money_lent) + parseInt(amount);
                        connection.query("update account_stats set total_money_lent = ? where email = ?;",[new_total_money_lent,email],(err,x)=>{})
                    })
    
                    //add this to lenders data table
                    var v1 = 5;
                    var v2 = 5;
                    if(riskApetite === 'high') {
                        v1 = 2,
                        v2 = 8
                    }
                    if(riskApetite === 'low') {
                        v1 = 8,
                        v2 = 2
                    }

                    connection.query("INSERT into lenders_data (v1,v2,lock_in_period,email,amount_lent, amount_remaining, fixed_lending_amount,current_borrower) values (?,?,?,?,?,?,?,0);",
                        [v1,v2, lock_in_period,email,amount,amount,parseInt(amount)/10]
                        ,(err,res) => {
                            console.log(err)
                            console.log(res)
                        }
                    );
    
                    res.send({"Lending_status" : "Success"});
                }
            }
        )
    
    }

});

router.post("/lending_transactions", function(req, res, next) {
    
    const email = req.body.email;

    connection.query(
        "SELECT * FROM lending_transactions WHERE email_id = ?",
        [email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            if (result.length > 0) {
                res.send(result);
            }
            else{
                res.send([])   
            }
        }
    )
});

router.post("/total_amount_lent", function(req, res, next) {
    
    const email = req.body.email;

    connection.query(
        "SELECT SUM(amount_lent) AS 'total' FROM lending_transactions where email_id = ?;",
        [email],
        (err, result)=> {
            if (err) {
                res.send({err: err});
            }
            else{
                res.send({total : result[0].total});
            }
        }
    )
});

router.post("/isProfileComplete", function(req, res, next) {
    
    // console.log("Hii");

    const email = req.body.email;
    // res.send({WrongMessage:"Wrong email bro"})   

    connection.query(
        "SELECT * FROM person WHERE email = ?",
        [email],
        (err, result)=> {
            // console.log(result)
            if (err) {
                res.send({err: err});
            }
    
            if (result.length > 0) {
                // console.log(result[0]);
                if(result[0].first_name != null){
                    res.send({result:true});
                }else{
                    res.send({result:false});
                }
                
            }
            else{
                res.send({WrongMessage:"Wrong email bro"})   
            }
        }
    )
});

module.exports = router;