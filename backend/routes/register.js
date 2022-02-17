var express = require("express");
var router = express.Router();
var connection = require('../connection')

router.get("/", function(req, res, next) {
    res.send("This statement is generate by Register API backend");
});

router.post('/', (req, res)=> {

    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    connection.query(
      "SELECT * from person where email = ?",
      [email],
      (err, result)=> {
        if(result.length > 0){
          res.send({message:"Email already exists"})
        }else{
          connection.query(
            "INSERT INTO person (email, password) VALUES (?,?)",
            [email, password],
            (err, result)=> {
              // console.log(result);
              res.send({"success":"User Registered Succesfully"})
            }
          );
        }
        console.log(result);
      }
    );
    
 });

module.exports = router;