var express = require("express");
var router = express.Router();
var connection = require('../connection')
var moment = require('moment');

router.get("/", function(req, res, next) {
    res.send("This statement is generate by Register API backend");
});

router.post('/', (req, res)=> {

    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    console.log(email);

    connection.query(
      "SELECT * from person where email = ?",
      [email],
      (err, result)=> {
        if(result.length > 0){
          res.send({message:"Email already exists"})
        }else{
          connection.query(
            "INSERT INTO person (email, password,username, last_not_opened) VALUES (?,?,?,?)",
            [email, password,username,moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
            (err, result)=> {

              connection.query("insert into account_stats (email,balance,total_money_lent,total_money_borrowed,total_interest_received,total_money_withdrawn,total_interest_paid) values (?,?,?,?,?,?,?)",
              [email,0,0,0,0,0,0,0],(err,res)=>{console.log(err)})
              
              res.send({"success":"User Registered Succesfully"})
            }
          );
        }
        console.log(result);
      }
    );
    
 });

module.exports = router;