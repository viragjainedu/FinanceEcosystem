var express = require("express");
var router = express.Router();
var connection = require('../connection')
var moment = require('moment');
const bcrypt = require("bcrypt");

router.get("/", function(req, res, next) {
    res.send("This statement is generate by Register API backend");
});

router.post('/', async (req, res)=> {

    const email = req.body.email;
    const username = req.body.username;
    console.log(email);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

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
              
              connection.query("insert into last_login (email,last_login,isLoggedIn) values (?,now(),?)",
              [email,true],(err,res)=>{console.log(err)})
              
              res.send({"success":"User Registered Succesfully"})
            }
          );
        }
        console.log(result);
      }
    );
    
 });

module.exports = router;