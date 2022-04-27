
var express = require("express");
var router = express.Router();
var connection = require('../connection');
var moment = require('moment');

router.post("/myProfileUsername", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    
    const username = req.body.username;
    const oldUsername = req.body.oldUsername;



    connection.query(
        "UPDATE person SET username = ? where username = ?;",
        [username, oldUsername],
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
module.exports = router;

router.post("/myProfilePassword", function(req, res, next) {
    // res.send("This statement is generate by p2pLending API backend");

    
    const password1 = req.body.password1;
    const username = req.body.username;




    connection.query(
        "UPDATE person SET password = ? where username = ?;",
        [password1, username],
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

module.exports = router;
