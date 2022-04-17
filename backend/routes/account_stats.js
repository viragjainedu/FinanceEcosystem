var express = require("express");
var router = express.Router();
var connection = require('../connection');

router.post("/", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");
    const email = req.body.email;

    connection.query(
        "Select * from account_stats where email = ?;",
        [email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                res.send(result[0])
            }else{
                res.send({})
            }
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/total_money_lent", function(req, res, next) {

    const email = req.body.email 
    
    connection.query(
        "Select total_money_lent from account_stats where email = ?;",
        [email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                console.log(result)
                res.send({total : result[0].total})
            }
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/balance", function(req, res, next) {
    
    const email = req.body.email ;
    
    connection.query(
        "Select balance from account_stats where email = ?;",
        [email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                console.log(result)
                res.send({total : result[0].total})
            }else
                res.send({total:0})
        }
      );
    // res.send({"Profile Recieved":"Yes"})
});

router.post("/prev_transactions", function(req, res, next) {
    
    const email = req.body.email ;
    connection.query(
        "Select * from lending_transactions where email_id = ? order by transaction_time DESC;",
        [email],
        (err, result)=> {
            if(err){
                console.log(err);
            }else if(result.length > 0){
                res.send(result)
            }else
                res.send([])
        }
      );

});

module.exports = router;